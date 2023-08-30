import { currentUser } from '@clerk/nextjs'
import { ProfileForm } from './profile-form'
import { Separator } from '@/components/ui/separator'

export default async function Profile() {
  const user = await currentUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { firstName, lastName, imageUrl } = user

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-lg font-medium">Profile</h1>
        <span className="text-sm text-muted-foreground">
          Update your basic profile info.
        </span>
      </div>

      <Separator />

      <ProfileForm user={{ firstName, lastName, imageUrl }} />
    </div>
  )
}
