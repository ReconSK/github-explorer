import { NextResponse } from "next/server";
import { fetchGitHubRepos, GitHubAPIError } from "@/lib/github";

interface RouteParams {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { username } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "30", 10);

  if (page < 1 || perPage < 1 || perPage > 100) {
    return NextResponse.json(
      { error: "Invalid pagination parameters" },
      { status: 400 }
    );
  }

  try {
    const repos = await fetchGitHubRepos(username, page, perPage);

    return NextResponse.json(
      {
        username,
        page,
        per_page: perPage,
        count: repos.length,
        repositories: repos,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch (err) {
    if (err instanceof GitHubAPIError) {
      return NextResponse.json(
        {
          error: err.message,
          status: err.status,
        },
        { status: err.status }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
