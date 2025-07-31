import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ArticleShare } from "@/components/articles/article-share"

interface ArticlePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    select: { title: true, content: true },
  })

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: article.title,
    description: article.content.substring(0, 150) + "...", // Basic description from content
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await prisma.article.findUnique({
    where: { id: params.id, published: true },
    include: { author: true },
  })

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <article className="prose mx-auto dark:prose-invert">
        <h1 className="mb-4 text-4xl font-extrabold leading-tight">{article.title}</h1>
        <div className="mb-6 text-muted-foreground">
          By {article.author?.name || "Unknown Author"} on {new Date(article.createdAt).toLocaleDateString()}
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <div className="mt-8 flex justify-end">
          <ArticleShare articleId={article.id} />
        </div>
      </article>
    </div>
  )
}
