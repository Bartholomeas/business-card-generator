"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Coś poszło nie tak!</h2>
      <button onClick={() => reset()}>Spróbuj ponownie</button>
    </div>
  );
}
