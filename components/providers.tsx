"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { AuthProvider } from "@/components/auth/auth-provider"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  )
}
