import Link from "next/link"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo className="hidden h-6 w-6 md:inline-block" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/vercel/v0"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
          <nav className="flex items-center space-x-4">
            <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  )
}
