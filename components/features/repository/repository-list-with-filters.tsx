"use client";
import { useState, useMemo } from "react";
import type { GitHubRepository, SortOption, SortOrder } from "@/types/github";
import {
  sortRepositories,
  filterByLanguage,
  getUniqueLanguages,
} from "@/lib/github";
import { RepositoryCard } from "./repository-card";
import { RepositoryPagination } from "./repository-pagination";
import { RepositoryFilters } from "./repository-filters";

interface RepositoryListWithFiltersProps {
  repositories: GitHubRepository[];
  currentPage: number;
  totalPages: number;
  username: string;
  totalCount: number;
}

export function RepositoryListWithFilters({
  repositories,
  currentPage,
  totalPages,
  username,
  totalCount,
}: RepositoryListWithFiltersProps) {
  const [sortBy, setSortBy] = useState<SortOption>("updated");
  const [order, setOrder] = useState<SortOrder>("desc");
  const [languageFilter, setLanguageFilter] = useState<string>("all");

  const languages = useMemo(
    () => getUniqueLanguages(repositories),
    [repositories]
  );

  const filteredAndSortedRepos = useMemo(() => {
    let filtered = repositories;

    if (languageFilter !== "all") {
      filtered = filterByLanguage(repositories, languageFilter);
    }

    return sortRepositories(filtered, sortBy, order);
  }, [repositories, sortBy, order, languageFilter]);

  const toggleOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-6">
      <RepositoryFilters
        sortBy={sortBy}
        order={order}
        languageFilter={languageFilter}
        languages={languages}
        onSortChange={setSortBy}
        onOrderToggle={toggleOrder}
        onLanguageChange={setLanguageFilter}
      />

      <p className="text-sm text-muted-foreground">
        Showing {filteredAndSortedRepos.length} of {totalCount} on this page
        {languageFilter !== "all" && ` (filtered by ${languageFilter})`}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedRepos.map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>

      <RepositoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        username={username}
      />
    </div>
  );
}
