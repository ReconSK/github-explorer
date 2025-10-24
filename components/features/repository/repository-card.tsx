import { ExternalLink, Star, GitFork, Circle } from "lucide-react";
import type { GitHubRepository } from "@/types/github";
import { formatRelativeTime, formatCompactNumber } from "@/lib/format";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-1">
            <CardTitle className="flex items-center gap-2">
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {repository.name}
              </a>
              <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </CardTitle>
            {repository.language && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Circle className="h-3 w-3 fill-current" />
                <span>{repository.language}</span>
              </div>
            )}
          </div>
          <Badge variant="secondary" className="shrink-0">
            <Star className="mr-1 h-3 w-3" />
            {formatCompactNumber(repository.stargazers_count)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">
          {repository.description || "No description available"}
        </CardDescription>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            {repository.forks_count > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                {formatCompactNumber(repository.forks_count)}
              </span>
            )}
            {repository.topics && repository.topics.length > 0 && (
              <span>{repository.topics.length} topics</span>
            )}
          </div>
          <span>Updated {formatRelativeTime(repository.updated_at)}</span>
        </div>

        {repository.topics && repository.topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {repository.topics.slice(0, 5).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
            {repository.topics.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{repository.topics.length - 5}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
