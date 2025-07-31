"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface UserProfile {
  id: string
  name: string | null
  email: string | null
  image: string | null
  emailVerified: Date | null
  createdAt: Date
  updatedAt: Date
}

export function SettingsClientPage() {
  const { data: session, update } = useSession()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      if (session?.user?.id) {
        try {
          setLoading(true)
          const res = await fetch("/api/user/profile")
          if (!res.ok) {
            throw new Error("Failed to fetch profile")
          }
          const data: UserProfile = await res.json()
          setUserProfile(data)
          setName(data.name || "")
          setEmail(data.email || "")
        } catch (error) {
          console.error("Error fetching profile:", error)
          toast.error("Failed to load user profile.")
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [session])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) {
      toast.error("You must be signed in to update your profile.")
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })

      if (!res.ok) {
        throw new Error("Failed to update profile")
      }

      const updatedData: UserProfile = await res.json()
      setUserProfile(updatedData)
      // Update session to reflect new name/email immediately
      await update({ name: updatedData.name, email: updatedData.email })
      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Failed to update profile.")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>Please sign in to view and manage your profile settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => (window.location.href = "/auth/signin")}>Sign In</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Profile Settings</CardTitle>
        <CardDescription>Manage your account information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              disabled={isSaving}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              disabled={isSaving}
            />
          </div>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
