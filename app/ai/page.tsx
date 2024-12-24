'use client'

import { ProjectCard } from '@/components/ai/ProjectCard'
import { MessageSquare, Image, FileCode, Sparkles } from 'lucide-react'

const projects = [
  {
    title: 'AI Chatbot',
    description: 'Chat with AI using Gemini or Llama models',
    href: '/ai/chatbot',
    icon: <MessageSquare className="h-full w-full" />,
    available: true
  },
  {
    title: 'Image Generation',
    description: 'Generate images from text descriptions',
    href: '/ai/image',
    icon: <Image className="h-full w-full" />,
    available: false
  },
  {
    title: 'Code Assistant',
    description: 'Get help with coding and debugging',
    href: '/ai/code',
    icon: <FileCode className="h-full w-full" />,
    available: false
  },
  {
    title: 'AI Tools',
    description: 'Various AI-powered utility tools',
    href: '/ai/tools',
    icon: <Sparkles className="h-full w-full" />,
    available: false
  }
]

export default function AI() {
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">AI Applications</h1>
        <p className="mt-2 text-muted-foreground">
          Explore our collection of AI-powered tools and applications
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.href} {...project} />
        ))}
      </div>
    </div>
  )
}
