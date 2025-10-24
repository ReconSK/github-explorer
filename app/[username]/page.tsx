import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchGitHubUser, GitHubAPIError } from "@/lib/github";
import { UserHeader, UserRepos } from "@/components/features/user";
import { RepositoryListSkeleton } from "@/components/features/repository";
import { Button } from "@/components/ui/button";

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function UserPage({
  params,
  searchParams,
}: UserPageProps) {
  const { username } = await params;
  const { page: pageParam } = await searchParams;

  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));

  try {
    const user = await fetchGitHubUser(username);

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

        <UserHeader user={user} />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Public Repositories</h2>
          <Suspense
            key={`${username}-${currentPage}`}
            fallback={<RepositoryListSkeleton />}
          >
            <UserRepos
              username={username}
              page={currentPage}
              totalRepos={user.public_repos}
            />
          </Suspense>
        </div>
      </div>
    );
  } catch (err) {
    if (err instanceof GitHubAPIError && err.status === 404) {
      notFound();
    }

    throw err;
  }
}

export async function generateMetadata({ params }: UserPageProps) {
  const { username } = await params;

  try {
    const user = await fetchGitHubUser(username);

    return {
      title: `${user.name || user.login} (@${user.login}) - GitHub Explorer`,
      description: user.bio || `Explore ${user.login}'s GitHub repositories`,
    };
  } catch {
    return {
      title: `${username} - GitHub Explorer`,
      description: `Explore ${username}'s GitHub repositories`,
    };
  }
}
