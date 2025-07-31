"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/auth/user-menu"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          KTSC Speed Test
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          {session && (
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {session ? (
            <UserMenu />
          ) : (
            <Link href="/auth/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
