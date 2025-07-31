"use client"

import Link from "next/link"
import { Icons } from "@/components/icons"
import { UserMenu } from "@/components/auth/user-menu"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">KTSC Speed Test</span>
          </Link>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link href="/articles" className="hover:text-primary">
              Articles
            </Link>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link href="/admin" className="hover:text-primary">
                Admin
              </Link>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {status === "loading" ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : session ? (
              <UserMenu />
            ) : (
              <Button asChild size="sm">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </nav>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 pt-6">
                <Link href="/" className="text-lg font-semibold">
                  Home
                </Link>
                <Link href="/articles" className="text-lg font-semibold">
                  Articles
                </Link>
                <Link href="/about" className="text-lg font-semibold">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-semibold">
                  Contact
                </Link>
                {session?.user?.role === "ADMIN" && (
                  <Link href="/admin" className="text-lg font-semibold">
                    Admin
                  </Link>
                )}
                {status !== "loading" && !session && (
                  <Button asChild className="mt-4">
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
