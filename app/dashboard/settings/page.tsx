import { SettingsClientPage } from "./SettingsClientPage"

export const metadata = {
  title: "Settings - KTSC Speed Testing App",
  description: "Manage your user profile and application settings.",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Settings</h1>
      <SettingsClientPage />
    </div>
  )
}
