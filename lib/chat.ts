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
  deleteDoc,
  type Timestamp
} from 'firebase/firestore'

export type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string
}

export type ConversationData = {
  title: string
  messages: Message[]
  userId: string
  model: string
  systemPrompt?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type Conversation = ConversationData & {
  id: string
}

export async function createConversation(
  userId: string,
  model: string,
  globalPrompt: string = ''
) {
  try {
    const newConversation: ConversationData = {
      title: 'New Conversation',
      messages: [],
      userId,
      model,
      systemPrompt: globalPrompt,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp
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
  updates: Partial<ConversationData>
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
    const conversations = querySnapshot.docs.map((doc) => {
      const data = doc.data() as ConversationData
      return {
        ...data,
        id: doc.id,
        messages: data.messages || []
      } as Conversation
    })

    return conversations
  } catch (error) {
    console.error('Error getting conversations:', error)
    throw error
  }
}
