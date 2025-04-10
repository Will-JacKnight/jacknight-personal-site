---
title: "Why this than that?"
date: "2025-04-09"
description: " A mindset go-through when developing a website."
tags: ["web dev", "trade-offs", "system design"]
---

## Intros

<!-- ## Contents -->


## Architecture


## Frontend

### Routing
- Client side routing
- Server side routing

### Styles
- Tailwind CSS over native CSS
    - describe styles declaratively using class names
        ```
        <div className="bg-blue-500 text-white p-4 rounded-lg">
        Hello, Tailwind!
        </div>
        ```
    - configure theme with tailwind.config.js
    - built-in dark mode support



## Backend

## Deployment

### Environment Structure
```
# Branch Structure
main (production)
  └── staging
       └── development
            └── feature branches

# Deployment Flow
feature/* -> development -> staging -> main
```
