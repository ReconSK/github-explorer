"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export function SearchForm() {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) return;

    setIsLoading(true);
    router.push(`/${trimmedUsername}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          className="flex-1"
          autoFocus
          required
        />
        <Button type="submit" disabled={isLoading || !username.trim()}>
          {isLoading ? (
            <>
              <Spinner className="mr-2 size-4" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 size-4" />
              Search
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Search for any GitHub user to explore their public repositories
      </p>
    </form>
  );
}
