import Link from "next/link";
import { UserX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-2xl space-y-8 px-4 py-16">
      <Button asChild variant="ghost" size="sm">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Link>
      </Button>

      <EmptyState
        icon={UserX}
        title="User Not Found"
        description="We couldn't find a GitHub user with this username. Please check the username and try again, or search for a different user."
        action={
          <Button asChild>
            <Link href="/">Search Again</Link>
          </Button>
        }
      />
    </div>
  );
}
