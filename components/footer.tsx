import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link href="/articles" className="hover:underline">
            Articles
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} KTSC Speed Testing App. All rights reserved.</p>
      </div>
    </footer>
  )
}
