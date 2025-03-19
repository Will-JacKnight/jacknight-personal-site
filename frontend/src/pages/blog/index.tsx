import React from 'react';
import { getAllPosts } from '../../lib/blog-loader';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { BlogPost } from '../../lib/blog-loader';

interface BlogPageProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const posts = await getAllPosts().catch(error => {
    console.error('Error fetching posts:', error);
    return [];
  });

  return {
    props: {
      posts
    },
    // Revalidate every hour
    revalidate: 3600
  };
};

export default function BlogPage({ posts }: BlogPageProps) {
  if (!posts.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <p className="text-gray-600">No posts found. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-8">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-2xl font-semibold hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <div className="text-gray-600 mt-2">
                {new Date(post.date).toLocaleDateString()}
              </div>
              <p className="mt-2 text-gray-700">{post.description}</p>
              <div className="mt-4 flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
} 