import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        {/* Auth status skeleton */}
        <Skeleton className="h-16 w-full rounded-lg" />

        {/* Status and Progress skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="h-6 w-64 mx-auto" />
          <Skeleton className="h-3 w-full" />
        </div>

        {/* Speed Metrics skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>

        {/* Controls skeleton */}
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-12 w-36 rounded-lg" />
          <Skeleton className="h-12 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
