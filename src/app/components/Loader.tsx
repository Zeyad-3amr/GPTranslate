import React from 'react';

export default function Loader() {
  return (
    <div className="flex items-center gap-2" aria-label="Loading...">
      <span className="h-3 w-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]"></span>
      <span className="h-3 w-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
      <span className="h-3 w-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
    </div>
  );
}
