'use client'
import Image from 'next/image'
import { showcase } from '@/app/showcase'
import clsx from 'clsx'
import { useRef } from 'react'
import Link from 'next/link'

function Site({ site, priority = false }) {
  const videoContentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const state = useRef('idle')

  function forceLayout() {
    void videoRef?.current?.offsetWidth
  }

  function showVideo() {
    forceLayout()
    if (videoContentRef.current) {
      videoContentRef.current.style.opacity = '1'
      videoContentRef.current.style.transition = ''
    }
  }

  function hiddenVideo(durationSecond = 0.5) {
    forceLayout()
    if (videoContentRef.current) {
      videoContentRef.current.style.opacity = '0'
      videoContentRef.current.style.transition = `opacity ${durationSecond}s linear`
    }
  }

  function onEnded() {
    state.current = 'looping'
    hiddenVideo()
  }

  function getVideo() {
    return videoRef.current
  }

  return (
    <li
      className="dark:highlight-white/5 group relative rounded-3xl bg-slate-50 p-6 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-700/50"
      onMouseEnter={() => {
        console.log(state)
        if (state.current === 'idle') {
          state.current = 'playing'
          getVideo()?.play()
          showVideo()
        } else if (state.current === 'leaving') {
          state.current = 'looping'
        }
      }}
      onMouseLeave={() => {
        state.current = 'leaving'
        hiddenVideo()
      }}
    >
      <div className="relative aspect-[672/494] transform overflow-hidden rounded-md bg-slate-200 shadow-[0_2px_8px_rgba(15,23,42,0.08)] dark:bg-slate-700">
        <Image
          alt=""
          className={clsx(
            'absolute inset-0 h-full w-full',
            site.dark && 'dark: hidden'
          )}
          src={site.thumbnail}
          priority={priority}
          unoptimized
        />
        <div
          ref={videoContentRef}
          onTransitionEnd={() => {
            const video = getVideo()
            if (state.current === 'leaving') {
              state.current = 'idle'
              const video = getVideo()
              if (video) {
                state.current = 'idle'
                video.currentTime = 0
                video.pause()
              }
            } else if (state.current === 'looping') {
              state.current = 'playing'
              if (video) {
                video.currentTime = 0
                video.play()
                showVideo()
              }
            }
          }}
        >
          <video
            ref={videoRef}
            preload="none"
            muted
            playsInline
            className={clsx(
              'absolute inset-0 h-full w-full [mask-image:radial-gradient(white,black)]',
              site.dark && 'dark:hidden'
            )}
            onEnded={onEnded}
          >
            <source src={site.video} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center">
        <h2 className="text-sm font-semibold leading-6 text-slate-900 group-hover:text-sky-500 dark:text-white dark:group-hover:text-sky-400">
          <Link href={site.slug}>
            <span className="absolute inset-0 rounded-3xl"></span>
            {site.name}
          </Link>
        </h2>
        <svg
          className="h-6 w-6 flex-none opacity-0 group-hover:opacity-100"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9.75 15.25L15.25 9.75M15.25 9.75H10.85M15.25 9.75V14.15"
            stroke="#0EA5E9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <p className="w-full flex-none text-[0.8125rem] leading-6 text-slate-500 dark:text-slate-400">
          {site.description}
        </p>
      </div>
    </li>
  )
}

export default function Home() {
  const imageStyle = { color: '#ff0000' }
  const videoStyle = { opacity: '0', transition: 'opacity 0.5s linear' }
  return (
    <main className="relative mt-16 sm:mt-20">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 sm:text-center lg:px-8">
        <h1 className="text-[2.5rem] font-semibold leading-6 text-sky-500">
          Showcase
        </h1>
        <p className="mt-6 text-2xl font-bold leading-none tracking-tight text-slate-900 dark:text-white">
          React | Next.js | Tailwind CSS | Shadcn UI | OpenRouter
        </p>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          This is my portfolio website, showcasing my front-end development
          skills, including expertise in React, Next.js, Tailwind CSS, Shadcn
          UI, and OpenRouter integration.
        </p>
      </div>
      <ul className="mx-auto mt-16 grid max-w-[26rem] grid-cols-1 gap-6 px-4 sm:mt-20 sm:max-w-[52.5rem] sm:grid-cols-2 sm:px-6 md:mt-32 lg:max-w-7xl lg:grid-cols-3 lg:gap-y-8 lg:px-8 xl:gap-x-8">
        {showcase.map((site, index) => (
          <Site key={site.name} site={site} priority={index < 6}></Site>
        ))}
      </ul>
    </main>
  )
}
