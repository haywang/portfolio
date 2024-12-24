'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import ChatbotContent from '@/components/ai/ChatbotContent'

export default function ChatbotPage() {
  return (
    <ProtectedRoute>
      <ChatbotContent />
    </ProtectedRoute>
  )
}
