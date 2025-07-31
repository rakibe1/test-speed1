"use client"
import { useMediaQuery } from "@/hooks/use-mobile"

export function useMobile() {
  const isMobile = useMediaQuery("(max-width: 768px)") // Example breakpoint for mobile
  return isMobile
}
