import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { SignInModal } from "@/components/auth/signin-modal"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
}

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  // If the user is already logged in, redirect them to the dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center p-4">
      <SignInModal open={true} onOpenChange={() => {}} />
    </div>
  )
}
