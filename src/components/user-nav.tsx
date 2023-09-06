import { SignOutButton, useUser } from '@clerk/nextjs'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'

export async function UserNav() {
  const { user } = await useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-8 h-8 rounded-full select-none bg-primary/10"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.imageUrl} alt="" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">
              {user?.firstName + ' ' + user?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {
                user?.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId,
                )?.emailAddress
              }
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/resumes">My resumes</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/connections">Manage connections</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/billing">Billing</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
