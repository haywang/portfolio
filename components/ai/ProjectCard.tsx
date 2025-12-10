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
        'group hover:bg-muted relative rounded-lg border p-6',
        !available && 'pointer-events-none opacity-60'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary h-12 w-12 rounded-full p-2.5">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">
            {title}
            {!available && (
              <span className="text-muted-foreground ml-2 text-xs">
                (Coming Soon)
              </span>
            )}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </Link>
  )
}
