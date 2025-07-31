"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PencilIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArticleForm } from "./article-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

interface Article {
  id: string
  title: string
  published: boolean
  createdAt: string
}

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const fetchArticles = async () => {
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

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        throw new Error("Failed to delete article")
      }
      toast.success("Article deleted successfully!")
      fetchArticles() // Re-fetch articles after deletion
    } catch (error) {
      console.error("Error deleting article:", error)
      toast.error("Failed to delete article.")
    }
  }

  const handleEdit = (article: Article) => {
    setEditingArticle(article)
    setIsEditDialogOpen(true)
  }

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false)
    setEditingArticle(null)
    fetchArticles() // Re-fetch articles after edit
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  if (articles.length === 0) {
    return <div className="text-center text-gray-500">No articles found. Create one above!</div>
  }

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Existing Articles</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>
                  <Badge variant={article.published ? "default" : "outline"}>
                    {article.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(article)}>
                      <PencilIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2Icon className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your article and remove its data
                            from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(article.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingArticle && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Edit Article</DialogTitle>
            </DialogHeader>
            <ArticleForm article={editingArticle} onSuccess={handleEditSuccess} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
