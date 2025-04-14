# Jacknight& Site

## Credits
This structure is inspired by Guangzheng Li's [nextjs-blog-template](https://github.com/guangzhengli/nextjs-blog-template).

## Site Infos
- [Deployed Site URL](https://jacknight-and-friends.vercel.app/)
- [Site Resources Endpoint URL](https://site-resources.lon1.cdn.digitaloceanspaces.com)
- Centrialised configurations are managed in ```/src/lib/config.ts```

### Frontend
- nextjs
- tailwindCSS
- React

### Backend
- nextjs
- considering pure serverless in the future
- options: cloudflare workers
- other server options:  [Railway](https://railway.com/?referralCode=SDfuE1), [Fly.io](https://fly.io/)


## Development

### Local development
- `npm run dev`: Start local development server

### Notes
- Navigation bar ```icon``` path is hardcoded for performance, currently a copy of svg path to navbar component is needed for future icon updates


## Blog Posts

### Configurations

- Every blog article should contain the following header:
    ```
    ---
    title: "Your Title"
    date: "YYYY-MM-DD"
    description: "Your description"
    tags: ["tag1", "tag2"]
    highlight: "Featured"
    ---
    ```
- The ```highlight``` tag is optional, once set the post will be pinned to the top of blog page

## License

This project is licensed under the [MIT License](public/LICENSE.txt).