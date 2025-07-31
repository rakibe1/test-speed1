import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArticlesList } from "@/components/admin/articles-list"
import { ArticleForm } from "@/components/admin/article-form"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Article Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Manage Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <ArticleForm />
            <Separator className="my-6" />
            <ArticlesList />
          </CardContent>
        </Card>

        {/* Other Admin Sections (Placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">System Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              This section could display overall system statistics, user management, or other administrative tools.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">1,234</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">5,678</p>
                </CardContent>
              </Card>
            </div>
            <Button className="w-full">View Detailed Reports</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
