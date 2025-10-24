import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserHeaderSkeleton } from "@/components/features/user";
import { RepositoryListSkeleton } from "@/components/features/repository";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8 px-4 py-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Link>
        </Button>
      </div>

      <UserHeaderSkeleton />

      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <RepositoryListSkeleton />
      </div>
    </div>
  );
}
