"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-screen max-w-2xl items-center px-4">
      <Card className="w-full border-destructive">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Something Went Wrong</CardTitle>
          <CardDescription>
            An unexpected error occurred while processing your request.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {error.message && (
            <div className="w-full rounded-md bg-muted p-3">
              <p className="text-sm font-mono text-muted-foreground">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={reset} variant="default">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>

          {error.digest && (
            <p className="text-xs text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
