import { z } from "zod"

export const speedTestSchema = z.object({
  downloadSpeed: z.number().min(0),
  uploadSpeed: z.number().min(0),
  ping: z.number().min(0),
  serverInfo: z
    .object({
      id: z.number().optional(),
      name: z.string().optional(),
      location: z.string().optional(),
      country: z.string().optional(),
    })
    .optional()
    .nullable(),
  location: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
})

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase, alphanumeric, and use hyphens"),
  published: z.boolean().default(false),
})

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name cannot exceed 50 characters").optional().nullable(),
  image: z.string().url("Invalid image URL").optional().nullable(),
})

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
