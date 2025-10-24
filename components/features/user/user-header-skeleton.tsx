import { Skeleton } from "@/components/ui/skeleton";

export function UserHeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <Skeleton className="h-[120px] w-[120px] rounded-full" />

      <div className="flex-1 space-y-4 text-center sm:text-left">
        <div>
          <Skeleton className="mx-auto h-9 w-48 sm:mx-0" />
          <Skeleton className="mx-auto mt-2 h-5 w-32 sm:mx-0" />
        </div>

        <Skeleton className="mx-auto h-16 w-full max-w-md sm:mx-0" />

        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-32" />
        </div>

        <Skeleton className="h-9 w-36" />
      </div>
    </div>
  );
}
