import { useState } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Input } from '../ui/input'
import { Plus, Edit2, Trash2, MessageSquare } from 'lucide-react'
import type { Conversation } from '@/lib/chat'
import { cn } from '@/lib/utils'
import { Textarea } from '../ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'

interface ConversationSidebarProps {
  conversations: Conversation[]
  currentConversation?: Conversation
  onSelect: (conversation: Conversation) => void
  onNew: () => void
  onRename: (conversation: Conversation, newTitle: string) => void
  onDelete: (conversation: Conversation) => void
  onPromptEdit: (conversation: Conversation, newPrompt: string) => void
}

export function ConversationSidebar({
  conversations,
  currentConversation,
  onSelect,
  onNew,
  onRename,
  onDelete,
  onPromptEdit
}: ConversationSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null)
  const [editingPrompt, setEditingPrompt] = useState('')
  const [deleteDialog, setDeleteDialog] = useState<Conversation | null>(null)

  const handleStartRename = (conversation: Conversation) => {
    if (!conversation.id) return
    setEditingId(conversation.id)
    setEditingTitle(conversation.title)
  }

  const handleRename = (conversation: Conversation) => {
    if (editingTitle.trim() && editingTitle !== conversation.title) {
      onRename(conversation, editingTitle.trim())
    }
    setEditingId(null)
  }

  const handleStartPromptEdit = (conversation: Conversation) => {
    if (!conversation.id) return
    setEditingPromptId(conversation.id)
    setEditingPrompt(conversation.systemPrompt || '')
  }

  const handlePromptSave = (conversation: Conversation) => {
    if (editingPrompt !== conversation.systemPrompt) {
      onPromptEdit(conversation, editingPrompt)
    }
    setEditingPromptId(null)
  }

  return (
    <div className="flex h-full w-64 flex-col border-r">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <Button onClick={onNew} size="icon" variant="ghost">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                'group flex items-center gap-2 rounded-lg p-2 hover:bg-muted',
                currentConversation?.id === conversation.id && 'bg-muted'
              )}
            >
              <Button
                variant="ghost"
                className="flex-1 justify-start gap-2 truncate p-2"
                onClick={() => {
                  onSelect(conversation)
                  requestAnimationFrame(() => {
                    const scrollArea = document.querySelector(
                      '[data-radix-scroll-area-viewport]'
                    )
                    if (scrollArea) {
                      scrollArea.scrollTop = scrollArea.scrollHeight
                    }
                  })
                }}
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                {editingId === conversation.id ? (
                  <Input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={() => handleRename(conversation)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleRename(conversation)
                      } else if (e.key === 'Escape') {
                        setEditingId(null)
                      }
                    }}
                    className="h-6 px-1"
                    autoFocus
                  />
                ) : (
                  <span className="truncate">{conversation.title}</span>
                )}
              </Button>
              <div className="hidden space-x-1 group-hover:flex">
                <Button
                  onClick={() => handleStartRename(conversation)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setDeleteDialog(conversation)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleStartPromptEdit(conversation)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
              {editingPromptId === conversation.id && (
                <div className="absolute left-0 top-0 z-10 w-full bg-background p-2">
                  <Textarea
                    value={editingPrompt}
                    onChange={(e) => setEditingPrompt(e.target.value)}
                    onBlur={() => handlePromptSave(conversation)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handlePromptSave(conversation)
                      } else if (e.key === 'Escape') {
                        setEditingPromptId(null)
                      }
                    }}
                    className="min-h-[100px] w-full"
                    placeholder="Enter system prompt..."
                    autoFocus
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deleteDialog?.title}
              &rdquo;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setDeleteDialog(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteDialog) {
                  onDelete(deleteDialog)
                  setDeleteDialog(null)
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
