// import { cn } from '@/lib/utils'
import type { Message } from '@/lib/chat'
import { Button } from '@/components/ui/button'
import { ThumbsUp, ThumbsDown, Copy, MoreHorizontal } from 'lucide-react'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === 'system') return null // Hide system messages

  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-4">
      {message.role === 'user' ? (
        <div className="flex justify-end space-y-4">
          <p className="rounded-lg bg-gray-50 p-4">{message.content}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="text-black-500 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
              <p>AI</p>
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-gray-800">{message.content}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pl-12">
            <Button variant="ghost" size="icon">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
