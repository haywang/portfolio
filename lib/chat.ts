import { db } from './firebase'
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

export type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string
}

export type Conversation = {
  id?: string
  title: string
  messages: Message[]
  userId: string
  model: string
  systemPrompt?: string
  createdAt: any
  updatedAt: any
}

export async function createConversation(
  userId: string,
  model: string,
  globalPrompt: string = ''
) {
  try {
    const newConversation: Omit<Conversation, 'id'> = {
      title: 'New Conversation',
      messages: [],
      userId,
      model,
      systemPrompt: globalPrompt,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(
      collection(db, 'conversations'),
      newConversation
    )
    return { ...newConversation, id: docRef.id }
  } catch (error) {
    console.error('Error creating conversation:', error)
    throw error
  }
}

export async function updateConversation(
  conversationId: string,
  updates: Partial<Conversation>
) {
  try {
    const conversationRef = doc(db, 'conversations', conversationId)
    await updateDoc(conversationRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating conversation:', error)
    throw error
  }
}

export async function deleteConversation(conversationId: string) {
  try {
    await deleteDoc(doc(db, 'conversations', conversationId))
  } catch (error) {
    console.error('Error deleting conversation:', error)
    throw error
  }
}

export async function getConversations(userId: string) {
  try {
    const simpleQuery = query(
      collection(db, 'conversations'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    )

    const querySnapshot = await getDocs(simpleQuery)
    const conversations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Conversation[]

    return conversations
  } catch (error) {
    console.error('Error getting conversations:', error)
    throw error
  }
}
