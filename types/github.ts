export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  fork: boolean;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  homepage: string | null;
  topics: string[];
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubError {
  message: string;
  documentation_url?: string;
}

export type SortOption = "stars" | "updated" | "name";
export type SortOrder = "asc" | "desc";

export interface RepositoryFilters {
  sort: SortOption;
  order: SortOrder;
  language?: string;
  page: number;
}
