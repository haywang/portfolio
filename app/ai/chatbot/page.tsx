'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { ChatMessage } from './chat-message'
import { ModelSelector, models } from './model-selector'
import { Toaster } from '@/components/ui/toaster'

export default function ChatbotPage() {
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [model, setModel] = useState(models[0].id)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: model
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '请求失败')
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message }
      ])
    } catch (error) {
      toast({
        title: '错误',
        description: error instanceof Error ? error.message : '发送消息失败',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="container mx-auto max-w-4xl p-4">
        <div className="flex h-[90vh] flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">AI 助手</h1>
            <ModelSelector value={model} onChange={setModel} />
          </div>

          <ScrollArea
            ref={scrollAreaRef}
            className="flex-1 rounded-lg border p-4"
          >
            <div className="space-y-4">
              {messages.map((message, i) => (
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
              placeholder="输入消息..."
              className="min-h-[60px] flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button type="submit" disabled={isLoading}>
              发送
            </Button>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  )
}
