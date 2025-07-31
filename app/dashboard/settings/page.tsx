import type { Metadata } from "next"
import SettingsClientPage from "./SettingsClientPage"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings.",
}

export default function SettingsPage() {
  return <SettingsClientPage />
}
