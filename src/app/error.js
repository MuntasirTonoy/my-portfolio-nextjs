"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-extrabold">
        <span className="text-spotify">Oops</span> · Something went wrong
      </h1>
      <p className="text-base-content/60 max-w-md">
        The page couldn&apos;t be loaded right now. Please try again in a moment.
      </p>
      <button type="button" onClick={reset} className="btn btn-soft btn-success">
        Try again
      </button>
    </main>
  );
}
