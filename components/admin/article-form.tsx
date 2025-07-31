"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RichTextEditor } from "./rich-text-editor"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
})

type ArticleFormValues = z.infer<typeof formSchema>

interface ArticleFormProps {
  initialData?: {
    id?: string
    title: string
    content: string
    published: boolean
  }
}

export function ArticleForm({ initialData }: ArticleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      published: false,
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  const onSubmit = async (values: ArticleFormValues) => {
    setIsSubmitting(true)
    try {
      const method = initialData?.id ? "PUT" : "POST"
      const url = initialData?.id ? `/api/articles/${initialData.id}` : "/api/articles"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to save article")
      }

      toast.success(initialData?.id ? "Article updated successfully!" : "Article created successfully!")
      router.push("/admin")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "An error occurred while saving the article.")
    } finally {
      setIsSubmitting(false)
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
                <Input placeholder="Article title" {...field} />
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
                <RichTextEditor content={field.value} onContentChange={field.onChange} />
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
                <p className="text-sm text-muted-foreground">Toggle to make the article visible to the public.</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Article"}
        </Button>
      </form>
    </Form>
  )
}
