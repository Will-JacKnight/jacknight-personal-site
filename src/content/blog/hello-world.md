---
title: "Hello World"
date: "2024-03-21"
tags: ["Next.js", "TypeScript", "Web Development"]
---

# Hello World

Welcome to my first blog post! This is a sample post to demonstrate the blog functionality.

## Code Example

Here's a simple React component:

```tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## Features

- Markdown support
- Code syntax highlighting
- Front matter parsing
- Responsive design
- Dark mode support 