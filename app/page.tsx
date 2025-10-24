import Link from "next/link";
import { Github } from "lucide-react";
import { SearchForm } from "@/components/features/search";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8">
      <div className="absolute right-8 top-8">
        <ThemeToggle />
      </div>
      
      <main className="flex w-full max-w-2xl flex-col items-center space-y-8 text-center">
        <div className="flex items-center gap-3">
          <Github className="size-12" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            GitHub Explorer
          </h1>
        </div>

        <p className="text-lg text-muted-foreground">
          Discover and explore public repositories from any GitHub user
        </p>

        <SearchForm />

        <div className="mt-8 flex flex-col gap-4 text-sm text-muted-foreground">
          <p>Try searching for popular users like:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["vercel", "facebook", "google", "microsoft"].map((username) => (
              <Link
                key={username}
                href={`/${username}`}
                className="rounded-md border px-3 py-1 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {username}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
