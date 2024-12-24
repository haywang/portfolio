import { useState } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Input } from '../ui/input'
import { Plus, Edit2, Trash2, MessageSquare } from 'lucide-react'
import type { Conversation } from '@/lib/chat'
import { cn } from '@/lib/utils'

interface ConversationSidebarProps {
  conversations: Conversation[]
  currentConversation?: Conversation
  onSelect: (conversation: Conversation) => void
  onNew: () => void
  onRename: (conversation: Conversation, newTitle: string) => void
  onDelete: (conversation: Conversation) => void
}

export function ConversationSidebar({
  conversations,
  currentConversation,
  onSelect,
  onNew,
  onRename,
  onDelete
}: ConversationSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  const handleStartRename = (conversation: Conversation) => {
    setEditingId(conversation.id)
    setEditingTitle(conversation.title)
  }

  const handleRename = (conversation: Conversation) => {
    if (editingTitle.trim() && editingTitle !== conversation.title) {
      onRename(conversation, editingTitle.trim())
    }
    setEditingId(null)
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
                onClick={() => onSelect(conversation)}
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
                  onClick={() => onDelete(conversation)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
