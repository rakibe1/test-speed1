import { ArticlesClientPage } from "./ArticlesClientPage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Articles - KTSC Speed Testing App",
  description: "Read articles and news about internet speed, technology, and more.",
}

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Our Articles</CardTitle>
          <CardContent className="text-center text-gray-700 dark:text-gray-300">
            Stay informed with our latest insights on internet speed, technology, and network performance.
          </CardContent>
        </CardHeader>
      </Card>
      <ArticlesClientPage />
    </div>
  )
}
