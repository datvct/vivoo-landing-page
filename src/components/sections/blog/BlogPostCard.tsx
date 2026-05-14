import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "./blog-types";

type BlogPostCardProps = {
    post: BlogPost;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
    return (
        <article className="overflow-hidden bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
            <div className="relative aspect-4/3">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {post.category}
                </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-6">
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-black/45">
                    {post.date} · {post.readTime}
                </div>
                <h2 className="mt-3 text-[18px] font-semibold leading-7 tracking-[-0.02em] text-black">
                    {post.title}
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-black/65">
                    {post.description}
                </p>
                <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-black px-5 py-2.5 text-sm font-semibold transition hover:bg-black hover:text-white"
                >
                    Read More
                </Link>
            </div>
        </article>
    );
}
