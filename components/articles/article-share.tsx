"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Share2, Check } from "lucide-react"
import { toast } from "sonner"

interface ArticleShareProps {
  articleId: string
}

export function ArticleShare({ articleId }: ArticleShareProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${window.location.origin}/article/${articleId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success("Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Share Article</h4>
            <p className="text-sm text-muted-foreground">Copy the link below to share this article.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="share-link">Article Link</Label>
            <div className="flex space-x-2">
              <Input id="share-link" defaultValue={shareUrl} readOnly />
              <Button type="button" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : "Copy"}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
