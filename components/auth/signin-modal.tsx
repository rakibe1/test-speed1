"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import { signIn } from "next-auth/react"

interface SignInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In to Save History</DialogTitle>
          <DialogDescription>
            Sign in with your GitHub account to save your speed test results and view your history.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button variant="outline" className="w-full bg-transparent" onClick={() => signIn("github")}>
            <GithubIcon className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
