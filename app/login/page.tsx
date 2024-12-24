'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const { user, signInWithGoogle } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/ai/chatbot')
    }
  }, [user, router])

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-gray-600">Please sign in to continue</p>
        </div>
        <Button
          onClick={signInWithGoogle}
          className="w-full"
          variant="outline"
          size="lg"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}
