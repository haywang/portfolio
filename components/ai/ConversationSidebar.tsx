import { useState } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Input } from '../ui/input'
import { Plus, Edit2, Trash2, MessageSquare, Menu, Search } from 'lucide-react'
import type { Conversation } from '@/lib/chat'
import { cn } from '@/lib/utils'
import { Textarea } from '../ui/textarea'
import { format, isThisWeek, isThisMonth, isThisYear } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'

interface GroupedConversations {
  recent: Conversation[]
  thisMonth: Conversation[]
  thisYear: Conversation[]
  older: Conversation[]
}

function groupConversationsByDate(
  conversations: Conversation[]
): GroupedConversations {
  return conversations.reduce(
    (groups, conversation) => {
      const date = conversation.createdAt?.toDate() || new Date()

      if (isThisWeek(date)) {
        groups.recent.push(conversation)
      } else if (isThisMonth(date)) {
        groups.thisMonth.push(conversation)
      } else if (isThisYear(date)) {
        groups.thisYear.push(conversation)
      } else {
        groups.older.push(conversation)
      }

      return groups
    },
    {
      recent: [],
      thisMonth: [],
      thisYear: [],
      older: []
    } as GroupedConversations
  )
}

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

  const groupedConversations = groupConversationsByDate(conversations)

  const renderConversationGroup = (
    conversations: Conversation[],
    title: string
  ) => {
    if (conversations.length === 0) return null

    return (
      // conversation item
      <div className="pt-4">
        {/* title */}
        <div className="text-sm">{title}</div>
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={currentConversation?.id === conversation.id}
            onSelect={onSelect}
            onRename={handleStartRename}
            onDelete={setDeleteDialog}
            onPromptEdit={handleStartPromptEdit}
            isEditing={editingId === conversation.id}
            editingTitle={editingTitle}
            setEditingTitle={setEditingTitle}
            handleRename={handleRename}
            setEditingId={setEditingId}
            editingPromptId={editingPromptId}
            editingPrompt={editingPrompt}
            setEditingPrompt={setEditingPrompt}
            handlePromptSave={handlePromptSave}
          />
        ))}
      </div>
    )
  }

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
    <div
      style={{ width: 256 }}
      className="flex flex-shrink-0 flex-col border-r"
    >
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" className="w-auto justify-start gap-2">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNew}>
            <Plus className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {renderConversationGroup(
            groupedConversations.recent,
            'Previous 7 Days'
          )}
          {renderConversationGroup(
            groupedConversations.thisMonth,
            format(new Date(), 'MMMM')
          )}
          {renderConversationGroup(
            groupedConversations.thisYear,
            format(new Date(), 'yyyy')
          )}
          {renderConversationGroup(groupedConversations.older, 'Older')}
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

function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onRename,
  onDelete,
  onPromptEdit,
  isEditing,
  editingTitle,
  setEditingTitle,
  handleRename,
  setEditingId,
  editingPromptId,
  editingPrompt,
  setEditingPrompt,
  handlePromptSave
}: {
  conversation: Conversation
  isActive: boolean
  onSelect: (conversation: Conversation) => void
  onRename: (conversation: Conversation) => void
  onDelete: (conversation: Conversation) => void
  onPromptEdit: (conversation: Conversation) => void
  isEditing: boolean
  editingTitle: string
  setEditingTitle: (title: string) => void
  handleRename: (conversation: Conversation) => void
  setEditingId: (id: string | null) => void
  editingPromptId: string | null
  editingPrompt: string
  setEditingPrompt: (prompt: string) => void
  handlePromptSave: (conversation: Conversation) => void
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          'group flex items-center gap-2 rounded-lg p-2 hover:bg-muted',
          isActive && 'bg-muted'
        )}
      >
        <Button
          variant="ghost"
          className="flex-1 justify-start gap-2 truncate p-2"
          onClick={() => onSelect(conversation)}
        >
          {isEditing ? (
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
            onClick={() => onRename(conversation)}
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
          <Button
            onClick={() => onPromptEdit(conversation)}
            size="icon"
            variant="ghost"
            className="h-8 w-8"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {editingPromptId === conversation.id && (
        <div className="absolute left-0 top-full z-10 w-full bg-background p-2 shadow-lg">
          <Textarea
            value={editingPrompt}
            onChange={(e) => setEditingPrompt(e.target.value)}
            onBlur={() => handlePromptSave(conversation)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handlePromptSave(conversation)
              } else if (e.key === 'Escape') {
                setEditingId(null)
              }
            }}
            className="min-h-[100px] w-full"
            placeholder="Enter system prompt..."
            autoFocus
          />
        </div>
      )}
    </div>
  )
}
