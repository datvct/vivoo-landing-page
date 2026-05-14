import type { BlogPost } from "./blog-types";
import BlogFeaturedPostCard from "./BlogFeaturedPostCard";
import BlogPostCard from "./BlogPostCard";

type BlogPostsGridProps = {
    posts: BlogPost[];
    currentPage: number;
};

export default function BlogPostsGrid({ posts, currentPage }: BlogPostsGridProps) {
    return (
        <div className="mt-14 space-y-6">
            {currentPage === 1 && posts.length > 0 && <BlogFeaturedPostCard post={posts[0]} />}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {(currentPage === 1 ? posts.slice(1) : posts).map((post) => (
                    <BlogPostCard key={`${post.title}-${post.date}`} post={post} />
                ))}
            </div>
        </div>
    );
}
