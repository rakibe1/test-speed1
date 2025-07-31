"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"

interface Article {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export function ArticlesClientPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true)
        const res = await fetch("/api/articles")
        if (!res.ok) {
          throw new Error(`Failed to fetch articles: ${res.statusText}`)
        }
        const data = await res.json()
        setArticles(data)
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.")
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  if (articles.length === 0) {
    return <div className="text-center text-gray-500">No articles found.</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">{article.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Published on {format(new Date(article.createdAt), "PPP")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {/* Display a truncated version of the content */}
            <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
              {/* This is a simplified display. In a real app, you might parse HTML to plain text or use a rich text renderer. */}
              {article.content.replace(/<[^>]*>?/gm, "")}
            </p>
            <Link href={`/article/${article.id}`} passHref>
              <Button variant="outline" className="w-full bg-transparent">
                Read More
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
