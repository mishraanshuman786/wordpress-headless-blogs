"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../lib/fetchData.js";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link"; // Import the Link component

export interface PostType {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  modified: string;
}

const AllPosts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
        <Skeleton className="w-3/4 h-6 rounded-full" />
        <Skeleton className="w-5/6 h-6 rounded-full" />
        <Skeleton className="w-2/3 h-6 rounded-full" />
        <Skeleton className="w-4/5 h-6 rounded-full" />
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-2xl mt-8 underline">My Posts</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {data.map((post: PostType) => (
          <Link
            key={post.id}
            href={`/allposts/${post.id}`} // Navigate to post details page (assuming dynamic routing)
            passHref
            className="p-6 border rounded-lg shadow-md transition-colors duration-300 dark:bg-gray-800 bg-white hover:shadow-lg cursor-pointer"
          >
            <div>
              <h1 className="text-xl font-semibold dark:text-white">
                {post.title.rendered}
              </h1>
              <p
                className="text-gray-600 dark:text-gray-300 mt-2"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              ></p>
              <small className="text-gray-500 dark:text-gray-400 mt-4 block">
                Modified: {new Date(post.modified).toLocaleDateString()}
              </small>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AllPosts;
