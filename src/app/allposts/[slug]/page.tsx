"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { getPost } from "@/lib/fetchData";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import CodeBlock from "@/components/CodeBlock";

interface Comment {
  id: number;
  name: string;
  email: string;
  comment: string;
  date: string;
}

const Post = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  const {
    isLoading,
    error,
    data: post,
  } = useQuery({
    queryKey: ["post", params.slug],
    queryFn: () => getPost(params.slug),
  });

  // State for comment form
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the comment to your backend
    console.log("Comment submitted:", commentData);
    setSubmitted(true);
    // Reset form
    setCommentData({
      name: "",
      email: "",
      comment: "",
    });
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
        <Skeleton className="w-3/4 h-8 rounded-full animate-pulse" />
        <Skeleton className="w-5/6 h-6 rounded-md animate-pulse" />
        <Skeleton className="w-full h-64 rounded-md animate-pulse" />
        <Skeleton className="w-full h-4 rounded-md animate-pulse" />
        <Skeleton className="w-2/3 h-4 rounded-md animate-pulse" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <p className="text-center text-red-500 text-lg">{error.message}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <div className="mb-6">
        <Button onClick={() => router.back()} variant="secondary">
          &larr; Back to Posts
        </Button>
      </div>

      {/* Post Container */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        {/* Post Content */}
        <article className="prose dark:prose-invert">
          {/* Post Title */}
          <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>

          {/* Featured Image (Optional) */}
          {post.featured_media && (
            <img
              src={post.featured_media}
              alt={post.title.rendered}
              className="w-full h-auto mb-6 rounded-md shadow-lg"
            />
          )}

          {/* Post Excerpt */}
          <div
            className="text-gray-700 dark:text-gray-300 mb-4"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          ></div>

          {/* Post Content */}
          <div
            className="text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          ></div>

          {/* Post Metadata */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span>Last Modified: </span>
            <span>{new Date(post.modified).toLocaleDateString()}</span>
          </div>
          <CodeBlock
            language="javascript"
            value="console.log('hello world');"
          />
        </article>
      </div>

      {/* Comments Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>

        {submitted && (
          <p className="mb-4 text-green-500">Thank you for your comment!</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={commentData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your Name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={commentData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your Email"
            />
          </div>

          {/* Comment Field */}
          <div>
            <label
              htmlFor="comment"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={commentData.comment}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your Comment"
              rows={4}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="w-full">
              Submit Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
