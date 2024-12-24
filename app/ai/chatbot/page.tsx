'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import ChatbotContent from './ChatbotContent'

export default function ChatbotPage() {
  return (
    <ProtectedRoute>
      <ChatbotContent />
    </ProtectedRoute>
  )
}
