import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/auth/user-menu"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder-logo.svg" alt="KTSC Logo" width={32} height={32} />
            <span className="font-bold text-lg">KTSC Speed Test</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/articles" className="text-sm font-medium hover:underline underline-offset-4">
              Articles
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <UserMenu />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-6">
                <Link href="/" className="text-lg font-medium hover:underline underline-offset-4">
                  Home
                </Link>
                <Link href="/about" className="text-lg font-medium hover:underline underline-offset-4">
                  About
                </Link>
                <Link href="/articles" className="text-lg font-medium hover:underline underline-offset-4">
                  Articles
                </Link>
                <Link href="/contact" className="text-lg font-medium hover:underline underline-offset-4">
                  Contact
                </Link>
                <Link href="/dashboard" className="text-lg font-medium hover:underline underline-offset-4">
                  Dashboard
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
