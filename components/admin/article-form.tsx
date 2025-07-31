"use client"

import { FormDescription } from "@/components/ui/form"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { RichTextEditor } from "./rich-text-editor"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
})

interface ArticleFormProps {
  article?: {
    id: string
    title: string
    content: string
    published: boolean
  }
  onSuccess?: () => void
}

export function ArticleForm({ article, onSuccess }: ArticleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      published: article?.published || false,
    },
  })

  useEffect(() => {
    if (article) {
      form.reset({
        title: article.title,
        content: article.content,
        published: article.published,
      })
    }
  }, [article, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const method = article ? "PUT" : "POST"
    const url = article ? `/api/articles/${article.id}` : "/api/articles"

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        throw new Error(`Failed to ${article ? "update" : "create"} article`)
      }

      toast.success(`Article ${article ? "updated" : "created"} successfully!`)
      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error("Error submitting article:", error)
      toast.error(`Failed to ${article ? "update" : "create"} article.`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Article Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <RichTextEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Publish Article</FormLabel>
                <FormDescription>Toggle to make the article visible to the public.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : article ? "Update Article" : "Create Article"}
        </Button>
      </form>
    </Form>
  )
}
