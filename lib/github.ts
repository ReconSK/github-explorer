import type {
  GitHubRepository,
  GitHubUser,
  SortOption,
  SortOrder,
} from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";

export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "GitHubAPIError";
  }
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new GitHubAPIError("User not found", 404);
    }
    if (res.status === 403) {
      throw new GitHubAPIError("API rate limit exceeded", 403);
    }
    throw new GitHubAPIError("Failed to fetch user", res.status);
  }

  return res.json();
}

export async function fetchGitHubRepos(
  username: string,
  page: number = 1,
  perPage: number = 30
): Promise<GitHubRepository[]> {
  const res = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`,
    {
      next: { revalidate: 1800 },
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      throw new GitHubAPIError("User not found", 404);
    }
    if (res.status === 403) {
      throw new GitHubAPIError("API rate limit exceeded", 403);
    }
    throw new GitHubAPIError("Failed to fetch repositories", res.status);
  }

  return res.json();
}

export function sortRepositories(
  repos: GitHubRepository[],
  sortBy: SortOption,
  order: SortOrder
): GitHubRepository[] {
  const sorted = [...repos].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "stars":
        comparison = a.stargazers_count - b.stargazers_count;
        break;
      case "updated":
        comparison =
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        break;
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return sorted;
}

export function filterByLanguage(
  repos: GitHubRepository[],
  language: string | null
): GitHubRepository[] {
  if (!language) return repos;
  return repos.filter(
    (repo) => repo.language?.toLowerCase() === language.toLowerCase()
  );
}

export function getUniqueLanguages(repos: GitHubRepository[]): string[] {
  const languages = repos
    .map((repo) => repo.language)
    .filter((lang): lang is string => lang !== null);
  return Array.from(new Set(languages)).sort();
}
