"use client"

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { authOptions } from "@/lib/auth"

export default async function SignInClientPage() {
  const session = await getServerSession(authOptions)

  // If the user is already logged in, redirect them to the dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription>Choose your preferred method to sign in</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" className="w-full bg-transparent" onClick={() => signIn("github")}>
            <GithubIcon className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </Button>
          {/* Add more sign-in options here if needed */}
        </CardContent>
      </Card>
    </div>
  )
}
