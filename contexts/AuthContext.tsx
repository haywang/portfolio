'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // add callback, when user login. it set user and stop loading
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider()
    try {
      // Configure custom parameters
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      // Clear any existing popup sessions
      await signOut(auth)

      // Sign in with popup
      await signInWithPopup(auth, provider)
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/cancelled-popup-request') {
          console.log('Popup was closed by user')
        } else if (error.code === 'auth/popup-blocked') {
          // If popup is blocked, try redirect method instead
          console.log('Popup is blocked')
        }
      }
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
