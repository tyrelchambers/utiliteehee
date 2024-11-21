"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="section border border-red-400 m-8 rounded-3xl bg-red-500/10 flex flex-col items-center">
      <h2 className="h1">Something went wrong!</h2>
      <p className="text-muted-foreground text-xl my-4">
        Ah shoot! What happened?
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </section>
  );
}
