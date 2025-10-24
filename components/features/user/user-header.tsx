import Image from "next/image";
import { Users, Book, ExternalLink } from "lucide-react";
import type { GitHubUser } from "@/types/github";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserHeaderProps {
  user: GitHubUser;
}

export function UserHeader({ user }: UserHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <Image
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        width={120}
        height={120}
        className="rounded-full border-4 border-muted"
        priority
      />

      <div className="flex-1 space-y-4 text-center sm:text-left">
        <div>
          <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
          <p className="text-muted-foreground">@{user.login}</p>
        </div>

        {user.bio && <p className="text-muted-foreground">{user.bio}</p>}

        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <Badge variant="secondary">
            <Users className="mr-1 h-3 w-3" />
            {user.followers} followers
          </Badge>
          <Badge variant="secondary">
            <Book className="mr-1 h-3 w-3" />
            {user.public_repos} repositories
          </Badge>
        </div>

        <Button asChild variant="outline" size="sm">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            View on GitHub
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
