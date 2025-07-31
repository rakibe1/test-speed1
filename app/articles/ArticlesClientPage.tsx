"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Article {
  id: string
  title: string
  content: string
  createdAt: string
  author: {
    name: string | null
  } | null
}

interface ArticlesClientPageProps {
  initialArticles: Article[]
}

export function ArticlesClientPage({ initialArticles }: ArticlesClientPageProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/articles?search=${encodeURIComponent(searchQuery)}`)
        if (!response.ok) {
          throw new Error("Failed to fetch articles")
        }
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error("Error fetching articles:", error)
        // Optionally show a toast error
      } finally {
        setLoading(false)
      }
    }

    const handler = setTimeout(() => {
      fetchArticles()
    }, 300) // Debounce search input

    return () => clearTimeout(handler)
  }, [searchQuery])

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-4xl font-bold">Our Articles</h1>
      <div className="mb-6">
        <Input
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))
        ) : articles.length > 0 ? (
          articles.map((article) => (
            <Card key={article.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{article.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  By {article.author?.name || "Unknown"} on {format(new Date(article.createdAt), "PPP")}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{article.content.replace(/<[^>]*>/g, "")}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href={`/article/${article.id}`} passHref>
                  <Button variant="outline" className="w-full bg-transparent">
                    Read More
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No articles found.</p>
        )}
      </div>
    </div>
  )
}
