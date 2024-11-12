"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="m-auto p-16 mt-40 rounded-md flex flex-col justify-center items-center w-[50%] border border-white">
        <h2>HEADLESS CMS USING NEXTJS</h2>
        <button
          className="p-3  rounded-md border border-white my-2 hover:bg-white hover:text-black"
          onClick={() => {
            router.push("/allposts");
          }}
        >
          My Blogs
        </button>
      </div>
    </>
  );
}
