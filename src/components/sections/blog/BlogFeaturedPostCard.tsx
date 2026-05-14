import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../../../types/blog-types";

type BlogFeaturedPostCardProps = {
  post: BlogPost;
};

export default function BlogFeaturedPostCard({
  post,
}: BlogFeaturedPostCardProps) {
  return (
    <article className="overflow-hidden bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-80">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {post.category}
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-8 lg:px-10 lg:py-10">
          <div className="text-xs font-medium tracking-[0.2em] text-black/45 uppercase">
            {post.date} ·{" "}
            {post.readTime}
          </div>
          <h2 className="mt-3 text-[28px] leading-tight font-semibold tracking-[-0.02em] text-black">
            {post.title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-black/65">
            {post.description}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-black px-5 py-2.5 text-sm font-semibold transition hover:bg-black hover:text-white"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
