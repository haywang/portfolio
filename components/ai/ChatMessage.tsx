import { cn } from '@/lib/utils'
import type { Message } from '@/lib/chat'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === 'system') return null // Hide system messages

  return (
    <div
      className={cn(
        'flex w-full',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {message.role === 'user' ? (
        ''
      ) : (
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200" />
      )}
      <div
        className={cn(
          'space-y-4 rounded-lg p-4',
          message.role === 'user' ? 'bg-gray-50' : ''
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
