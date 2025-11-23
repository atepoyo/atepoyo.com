"use client";
import { useEffect, useState } from "react";

export function Counter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(Math.floor(Math.random() * 100));
  }, []);

  return (
    <div>
      <div>{count === null ? "..." : count}</div>
      <button
        onClick={() => setCount((prev) => (prev ?? 0) + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Increment
      </button>
    </div>
  );
}
