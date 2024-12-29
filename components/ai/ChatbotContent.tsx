'use client'

import { useState, useRef, useEffect } from 'react'
// shadcn ui
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { ScrollArea } from '../ui/scroll-area'
import { Toaster } from '../ui/toaster'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
// lucide ui
import { Loader2, Settings } from 'lucide-react'
// custom components
import { ChatMessage } from './ChatMessage'
import { ModelSelector, models } from './ModelSelector'
import { ConversationSidebar } from './ConversationSidebar'
// utils
import { useAuth } from '@/contexts/AuthContext'
import {
  createConversation,
  updateConversation,
  deleteConversation,
  getConversations,
  type Message,
  type Conversation
} from '@/lib/chat'
// Toast ui
import { useToast } from '@/hooks/use-toast'

export default function ChatbotPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  // Load conversations when component mounts
  useEffect(() => {
    async function loadConversations() {
      if (user) {
        try {
          // get conversations from firebase
          const loadedConversations = await getConversations(user.uid)
          setConversations(loadedConversations)
          if (loadedConversations.length > 0) {
            setCurrentConversation(loadedConversations[0])
            setSystemPrompt(loadedConversations[0].systemPrompt || '')
          }
        } catch (error) {
          console.error('Error loading conversations:', error)
          toast({
            title: 'Error',
            description: 'Failed to load conversation history',
            variant: 'destructive'
          })
        }
      }
    }
    loadConversations()
  }, [user, toast])

  const handleNewConversation = async () => {
    if (!user) return
    try {
      const newConversation = await createConversation(
        user.uid,
        models[0].id, // Todo: Error, when create new conversation, it use the current select item, not the first item
        systemPrompt
      )
      // add the new conversation to the start of Array
      setConversations((prev) => [newConversation, ...prev])
      // set the current conversation to new conversation
      setCurrentConversation(newConversation)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create new conversation',
        variant: 'destructive'
      })
    }
  }

  const handleRenameConversation = async (
    conversation: Conversation,
    newTitle: string
  ) => {
    try {
      await updateConversation(conversation.id, { title: newTitle })
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversation.id ? { ...conv, title: newTitle } : conv
        )
      )
      if (currentConversation?.id === conversation.id) {
        setCurrentConversation({
          ...currentConversation,
          title: newTitle
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to rename conversation',
        variant: 'destructive'
      })
    }
  }

  const handleDeleteConversation = async (conversation: Conversation) => {
    try {
      await deleteConversation(conversation.id)
      setConversations((prev) =>
        prev.filter((conv) => conv.id !== conversation.id)
      )
      if (currentConversation?.id === conversation.id) {
        const remaining = conversations.filter(
          (conv) => conv.id !== conversation.id
        )
        setCurrentConversation(remaining.length > 0 ? remaining[0] : null)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete conversation',
        variant: 'destructive'
      })
    }
  }

  const handlePromptUpdate = async (
    conversation: Conversation,
    newPrompt: string
  ) => {
    try {
      await updateConversation(conversation.id!, { systemPrompt: newPrompt })
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversation.id
            ? { ...conv, systemPrompt: newPrompt }
            : conv
        )
      )
      if (currentConversation?.id === conversation.id) {
        setCurrentConversation({
          ...currentConversation,
          systemPrompt: newPrompt
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update system prompt',
        variant: 'destructive'
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !user || !currentConversation) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    }

    const messages = [...currentConversation.messages]

    // Add system prompt if it exists and there are no messages yet
    if (systemPrompt && messages.length === 0) {
      messages.push({
        role: 'system',
        content: systemPrompt,
        timestamp: new Date().toISOString()
      })
    }

    messages.push(userMessage)

    // Update conversation immediately for optimistic UI
    setCurrentConversation({
      ...currentConversation,
      messages
    })
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          model: currentConversation.model
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Request failed')
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString()
      }

      const updatedMessages = [...messages, assistantMessage]
      const updatedConversation = {
        ...currentConversation,
        messages: updatedMessages
      }

      // Update conversation in state and Firestore
      setCurrentConversation(updatedConversation)
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversation.id ? updatedConversation : conv
        )
      )
      await updateConversation(currentConversation.id, {
        messages: updatedMessages
      })
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive'
      })
      // Revert optimistic update
      setCurrentConversation(currentConversation)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSystemPromptChange = async () => {
    if (!currentConversation) return
    try {
      await updateConversation(currentConversation.id, {
        systemPrompt
      })
      setCurrentConversation({
        ...currentConversation,
        systemPrompt
      })
      toast({
        title: 'Success',
        description: 'System prompt updated successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update system prompt',
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      )
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
    }
  }, [currentConversation?.messages])

  useEffect(() => {
    if (scrollAreaRef.current && currentConversation?.messages?.length) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        const scrollArea = scrollAreaRef.current?.querySelector(
          '[data-radix-scroll-area-viewport]'
        )
        if (scrollArea) {
          scrollArea.scrollTop = scrollArea.scrollHeight
        }
      })
    }
  }, [currentConversation?.id]) // Only trigger when conversation changes

  return (
    <div className="flex h-[90vh]">
      <ConversationSidebar
        conversations={conversations}
        currentConversation={currentConversation || undefined}
        onSelect={setCurrentConversation}
        onNew={handleNewConversation}
        onRename={handleRenameConversation}
        onDelete={handleDeleteConversation}
        onPromptEdit={(conversation, newPrompt) => {
          handlePromptUpdate(conversation, newPrompt)
        }}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {currentConversation?.title || 'New Chat'}
          </h1>
          <div className="flex items-center gap-2">
            <ModelSelector
              value={currentConversation?.model || models[0].id}
              onChange={(newModel) => {
                if (currentConversation) {
                  updateConversation(currentConversation.id!, {
                    model: newModel
                  })
                  setCurrentConversation({
                    ...currentConversation,
                    model: newModel
                  })
                }
              }}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chat Settings</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="systemPrompt">System Prompt</Label>
                    <Textarea
                      id="systemPrompt"
                      value={currentConversation?.systemPrompt || systemPrompt}
                      onChange={(e) => {
                        if (currentConversation) {
                          setCurrentConversation({
                            ...currentConversation,
                            systemPrompt: e.target.value
                          })
                        } else {
                          setSystemPrompt(e.target.value)
                        }
                      }}
                      placeholder="Enter a system prompt to guide the conversation..."
                      className="h-32"
                    />
                    <Button onClick={handleSystemPromptChange}>Save</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 rounded-lg border p-4"
        >
          <div className="space-y-4">
            {currentConversation?.messages.map((message, i) => (
              <ChatMessage key={i} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="min-h-[60px] flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button type="submit" disabled={isLoading || !currentConversation}>
            Send
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  )
}
