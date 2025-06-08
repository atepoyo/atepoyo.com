'use client';
import React, { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(Math.random() * 100);
  return (
    <div>
    <div>
      {count}
    </div>
    <button onClick={() => setCount(count + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
      Increment
    </button>
    </div>
  );
}