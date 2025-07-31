"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Share2Icon, TwitterIcon, FacebookIcon, LinkedinIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

interface ArticleShareProps {
  title: string
  url: string
}

export function ArticleShare({ title, url }: ArticleShareProps) {
  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this article: ${title}`)
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`
    window.open(shareUrl, "_blank")
  }

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(shareUrl, "_blank")
  }

  const shareOnLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    window.open(shareUrl, "_blank")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast.success("Article link copied to clipboard!")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full bg-transparent">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share Article
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={shareOnTwitter}>
            <TwitterIcon className="h-5 w-5" />
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={shareOnFacebook}>
            <FacebookIcon className="h-5 w-5" />
            <span className="sr-only">Share on Facebook</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={shareOnLinkedIn}>
            <LinkedinIcon className="h-5 w-5" />
            <span className="sr-only">Share on LinkedIn</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={copyToClipboard}>
            <CopyIcon className="h-5 w-5" />
            <span className="sr-only">Copy link</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
