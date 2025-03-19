# Blog Content Directory

This directory contains all blog posts in markdown format. Each blog post should be a separate markdown file with frontmatter metadata.

## Structure

```
blogs/
  ├── posts/         # All blog post markdown files
  ├── images/        # Blog post images
  └── metadata.json  # Global blog metadata
```

## Frontmatter Format

Each blog post should include the following frontmatter:

```yaml
---
title: Your Blog Title
date: YYYY-MM-DD
description: A brief description of your blog post
tags: [tag1, tag2]
slug: unique-url-slug
---
``` 