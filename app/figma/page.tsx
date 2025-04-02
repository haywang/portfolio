'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  color: string
}

const projects: Project[] = [
  {
    id: 'plant-shop',
    title: 'Plant Shop',
    description:
      'A modern e-commerce app for plant lovers with beautiful UI and smooth interactions.',
    image: '/images/plant-shop/Plant-Shop.png',
    link: '/figma/plant-shop-preview',
    color: '#4CAF50'
  }
  // 可以继续添加更多项目
]

export default function FigmaPortfolio() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-16">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-4xl font-bold text-white md:text-5xl"
        >
          Figma Design Showcase
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={project.link}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  translateZ: 20
                }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                style={{
                  backgroundColor: project.color + '10',
                  borderColor: project.color + '30'
                }}
                className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300"
              >
                <div className="relative z-10">
                  <h2 className="mb-2 text-2xl font-bold text-white">
                    {project.title}
                  </h2>
                  <p className="mb-4 text-gray-300">{project.description}</p>

                  <motion.div
                    initial={false}
                    animate={{
                      scale: hoveredId === project.id ? 1.1 : 1,
                      rotate: hoveredId === project.id ? -5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-video w-full overflow-hidden rounded-lg"
                  >
                    {/* 项目预览图 */}
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                  </motion.div>
                </div>

                {/* 背景装饰 */}
                <div
                  className="absolute inset-0 -z-10 opacity-20 blur-3xl transition-all duration-300 group-hover:opacity-30"
                  style={{ backgroundColor: project.color }}
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
