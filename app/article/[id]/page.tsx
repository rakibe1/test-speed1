import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArticleShare } from "@/components/articles/article-share"
import { format } from "date-fns"

async function getArticle(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/articles/${id}`, {
    cache: "no-store", // Ensure fresh data
  })

  if (!res.ok) {
    if (res.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch article: ${res.statusText}`)
  }

  return res.json()
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center mb-2">{article.title}</CardTitle>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Published on {format(new Date(article.createdAt), "PPP")}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-gray-800 dark:text-gray-200">
          <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose dark:prose-invert max-w-none" />
          <Separator />
          <ArticleShare title={article.title} url={`${process.env.NEXT_PUBLIC_APP_URL}/article/${article.id}`} />
        </CardContent>
      </Card>
    </div>
  )
}
