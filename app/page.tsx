import Image from 'next/image'
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
        <li className="dark:highlight-white/5 group relative rounded-3xl bg-slate-50 p-6 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-700/50">
          <div className="relative aspect-[672/494] transform overflow-hidden rounded-md bg-slate-200 shadow-[0_2px_8px_rgba(15,23,42,0.08)] dark:bg-slate-700">
            <Image
              alt=""
              // fetchpriority="high"
              width="672"
              height="494"
              decoding="async"
              data-nimg="1"
              className="absolute inset-0 h-full w-full"
              src="https://tailwindcss.com/_next/static/media/openai.com.86b03227.png"
              style={imageStyle}
            />
            <div style={videoStyle}>
              <video
                preload="none"
                playsInline
                className="absolute inset-0 h-full w-full [mask-image:radial-gradient(white,black)]"
              >
                <source
                  src="https://tailwindcss.com/_next/static/media/openai.com.e55b5afbebfae62d1350968a66653eef24f49dfe.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center">
            <h2 className="text-sm font-semibold leading-6 text-slate-900 group-hover:text-sky-500 dark:text-white dark:group-hover:text-sky-400">
              <a href="/showcase/openai">
                <span className="absolute inset-0 rounded-3xl"></span>OpenAI /
                ChatGPT
              </a>
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
              Marketing website &amp; chat interface
            </p>
          </div>
        </li>
      </ul>
    </main>
  )
}
