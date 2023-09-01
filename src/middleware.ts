import { authMiddleware } from '@clerk/nextjs'
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ['/'],
  ignoredRoutes: ['/api/webhooks/users'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
