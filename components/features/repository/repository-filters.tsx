"use client";

import { ArrowUpDown } from "lucide-react";
import type { SortOption, SortOrder } from "@/types/github";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RepositoryFiltersProps {
  sortBy: SortOption;
  order: SortOrder;
  languageFilter: string;
  languages: string[];
  onSortChange: (value: SortOption) => void;
  onOrderToggle: () => void;
  onLanguageChange: (value: string) => void;
}

export function RepositoryFilters({
  sortBy,
  order,
  languageFilter,
  languages,
  onSortChange,
  onOrderToggle,
  onLanguageChange,
}: RepositoryFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stars">Stars</SelectItem>
            <SelectItem value="updated">Last Updated</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={onOrderToggle}
          className="gap-1"
        >
          <ArrowUpDown className="h-4 w-4" />
          {order === "asc" ? "Ascending" : "Descending"}
        </Button>
      </div>

      {languages.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Language:</span>
          <Select value={languageFilter} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
