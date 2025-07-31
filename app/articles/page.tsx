import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ArticlesClientPage } from "./ArticlesClientPage"

export const metadata: Metadata = {
  title: "Articles",
  description: "Read our latest articles and news.",
}

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  })

  // Convert Date objects to strings for client component serialization
  const serializableArticles = articles.map((article) => ({
    ...article,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  }))

  return <ArticlesClientPage initialArticles={serializableArticles} />
}
