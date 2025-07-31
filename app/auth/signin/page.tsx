import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import SignInClientPage from "./SignInClientPage"
import { authOptions } from "@/lib/auth"

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

  return <SignInClientPage />
}
