import { currentUser } from '@clerk/nextjs'
import { ProfileForm } from './profile-form'
import { Separator } from '@/components/ui/separator'

export default async function Profile() {
  const user = await currentUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { username, firstName, lastName, imageUrl, emailAddresses } = user

  const { emailAddress } = emailAddresses[0]

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-lg font-medium">Profile</h1>
        <span className="text-sm text-muted-foreground">
          Update your basic profile info.
        </span>
      </div>

      <Separator />

      <ProfileForm
        user={{ username, firstName, lastName, imageUrl, emailAddress }}
      />
    </div>
  )
}
