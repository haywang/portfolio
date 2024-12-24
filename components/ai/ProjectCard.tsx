import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Project {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  available: boolean
}

export function ProjectCard({
  title,
  description,
  href,
  icon,
  available
}: Project) {
  return (
    <Link
      href={available ? href : '#'}
      className={cn(
        'group relative rounded-lg border p-6 hover:bg-muted',
        !available && 'pointer-events-none opacity-60'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 p-2.5 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">
            {title}
            {!available && (
              <span className="ml-2 text-xs text-muted-foreground">
                (Coming Soon)
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  )
}
