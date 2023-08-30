import { BellIcon, GearIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Link from 'next/link'
import { Merge, Rocket, Split } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'

export async function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-6 gap-1 px-2 rounded-full text-secondary-foreground"
          size="sm"
        >
          <BellIcon className="w-3 h-3" />
          <span>12</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" alignOffset={-16} className="p-4 w-80">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Notifications</span>
          <Link
            className="text-muted-foreground hover:text-primary"
            href="/settings"
          >
            <GearIcon className="w-4 h-4" />
          </Link>
        </div>

        <Tabs defaultValue="new" className="mt-2">
          <TabsList className="space-x-1">
            <TabsTrigger value="new">New (3)</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 border rounded-full border-primary/10 bg-primary/5">
              <Split className="w-4 h-4 text-violet-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-relaxed">
                New event <strong>pluto.subscription-created</strong> was
                created under <strong>pluto</strong> service by{' '}
                <strong>Diego Fernandes</strong>.
              </p>
              <time className="text-xs text-muted-foreground">
                15 minutes ago
              </time>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 border rounded-full border-primary/10 bg-primary/5">
              <Merge className="w-4 h-4 text-sky-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-relaxed">
                New subscription on <strong>pluto.subscription-created</strong>{' '}
                was created under <strong>skylab</strong> service by{' '}
                <strong>Gabriel Buzzi</strong>.
              </p>
              <time className="text-xs text-muted-foreground">4 hours ago</time>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 border rounded-full border-primary/10 bg-primary/5">
              <Rocket className="w-4 h-4 text-amber-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-relaxed">
                New version <strong>v1.0.1</strong> released on{' '}
                <strong>pluto.subscription-created</strong> event.
              </p>
              <time className="text-xs text-muted-foreground">6 hours ago</time>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Archive all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
