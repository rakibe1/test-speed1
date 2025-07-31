"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import type { ClientSafeProvider } from "next-auth/react"

interface SignInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SignInFormProps {
  providers: Record<string, ClientSafeProvider> | null
}

export function SignInForm({ providers }: SignInFormProps) {
  return (
    <div className="grid gap-4">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {provider.id === "google" && (
              <Button variant="outline" className="w-full bg-transparent" onClick={() => signIn(provider.id)}>
                <Icons.google className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
            )}
            {provider.id === "github" && (
              <Button variant="outline" className="w-full bg-transparent" onClick={() => signIn(provider.id)}>
                <Icons.github className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </Button>
            )}
            {/* Add more providers as needed */}
          </div>
        ))}
    </div>
  )
}

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null)
  const handleSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/dashboard" })
  }

  // Fetch providers when the modal opens
  useState(() => {
    const fetchProviders = async () => {
      const res = await fetch("/api/auth/providers")
      const data = await res.json()
      setProviders(data)
    }
    if (open && !providers) {
      fetchProviders()
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in to save your speed test history and access personalized features.
          </DialogDescription>
        </DialogHeader>
        <SignInForm providers={providers} />
        <Separator />
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          By signing in, you agree to our{" "}
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  )
}
