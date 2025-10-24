import { AlertCircle } from "lucide-react";
import {
  fetchGitHubRepos,
  GitHubAPIError,
} from "@/lib/github";
import {
  RepositoryListWithFilters,
} from "@/components/features/repository";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const REPOS_PER_PAGE = 30;

interface UserReposProps {
  username: string;
  page: number;
  totalRepos: number;
}

export async function UserRepos({
  username,
  page,
  totalRepos,
}: UserReposProps) {
  try {
    const repos = await fetchGitHubRepos(username, page, REPOS_PER_PAGE);

    if (totalRepos === 0) {
      return (
        <Alert>
          <AlertCircle className="size-4" />
          <AlertTitle>No repositories found</AlertTitle>
          <AlertDescription>
            This user doesn&apos;t have any public repositories yet.
          </AlertDescription>
        </Alert>
      );
    }

    const totalPages = Math.ceil(totalRepos / REPOS_PER_PAGE);

    return (
      <RepositoryListWithFilters
        repositories={repos}
        currentPage={page}
        totalPages={totalPages}
        username={username}
        totalCount={totalRepos}
      />
    );
  } catch (err) {
    if (err instanceof GitHubAPIError) {
      if (err.status === 403) {
        return (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Rate Limit Exceeded</AlertTitle>
            <AlertDescription>
              GitHub API rate limit has been exceeded. Please try again later or
              add a GitHub access token to increase the limit.
            </AlertDescription>
          </Alert>
        );
      }
    }

    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch repositories. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
}
