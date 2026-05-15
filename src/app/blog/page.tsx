"use client";

import {
  useMemo,
  useState,
} from "react";
import BlogHeroSection from "@/components/sections/blog/BlogHeroSection";
import BlogPostsGrid from "@/components/sections/blog/BlogPostsGrid";
import BlogPagination from "@/components/sections/blog/BlogPagination";
import type { BlogPost } from "@/types/blog-types";

const blogPosts: BlogPost[] = [
  {
    title: "Security Technology Trends",
    category: "Industry Insights",
    description:
      "What does the future of security technology look like? Check this guide for the latest trends and how you can leverage them for your organization.",
    image: "/images/image1.avif",
    date: "May 14, 2026",
    readTime: "6 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "AI Security Systems",
    category: "Artificial Intelligence",
    description:
      "Learn what AI security systems are, how they work and why they matter for modern organizations.",
    image: "/images/camera-1.avif",
    date: "May 12, 2026",
    readTime: "5 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "School safety issues",
    category: "Education",
    description:
      "Discover school safety issues, best practices to help overcome them and free safety resources.",
    image: "/images/camera-2.avif",
    date: "May 10, 2026",
    readTime: "7 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "AI in physical security",
    category: "Technology",
    description:
      "Explore AI in physical security, technology applications, implementation tips and compliance.",
    image: "/images/image1.avif",
    date: "May 8, 2026",
    readTime: "4 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Access control best practices",
    category: "Access Control",
    description:
      "How to design access policies that keep people moving while reducing unauthorized entry.",
    image: "/images/camera-1.avif",
    date: "May 6, 2026",
    readTime: "5 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "Video management tips",
    category: "Video Security",
    description:
      "A practical checklist for choosing, deploying and scaling your video management platform.",
    image: "/images/camera-2.avif",
    date: "May 4, 2026",
    readTime: "6 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Retail loss prevention trends",
    category: "Retail",
    description:
      "See how retailers are using analytics and video intelligence to reduce loss and improve safety.",
    image: "/images/image1.avif",
    date: "May 2, 2026",
    readTime: "5 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "Healthcare security guide",
    category: "Healthcare",
    description:
      "Protect patients, staff and assets with a layered approach to healthcare security.",
    image: "/images/camera-1.avif",
    date: "April 30, 2026",
    readTime: "7 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Construction site monitoring",
    category: "Construction",
    description:
      "Reduce theft and vandalism with remote monitoring strategies for active jobsites.",
    image: "/images/camera-2.avif",
    date: "April 28, 2026",
    readTime: "4 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "Campus safety planning",
    category: "Education",
    description:
      "Build a layered campus safety plan with cameras, access control and communication tools.",
    image: "/images/image1.avif",
    date: "April 26, 2026",
    readTime: "6 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Smart surveillance analytics",
    category: "Analytics",
    description:
      "Understand how smart analytics help teams detect events faster and respond with confidence.",
    image: "/images/camera-1.avif",
    date: "April 24, 2026",
    readTime: "5 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "Modern security operations",
    category: "Operations",
    description:
      "Improve security operations with better workflows, alerts and incident management practices.",
    image: "/images/camera-2.avif",
    date: "April 22, 2026",
    readTime: "6 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Warehouse protection strategies",
    category: "Logistics",
    description:
      "Protect warehouse assets and shipping lanes with practical security planning.",
    image: "/images/image1.avif",
    date: "April 20, 2026",
    slug: "martyns-law-in-education",
    readTime: "4 min read",
  },
  {
    title:
      "Incident response checklist",
    category: "Safety",
    description:
      "Create a repeatable incident response plan that improves coordination across teams.",
    image: "/images/camera-1.avif",
    date: "April 18, 2026",
    readTime: "5 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Security leadership insights",
    category: "Leadership",
    description:
      "Learn how leaders can align technology, policy and training into one security strategy.",
    image: "/images/camera-2.avif",
    date: "April 16, 2026",
    readTime: "6 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "Future of access analytics",
    category: "Access Control",
    description:
      "Explore how access data can be turned into actionable insights for better decisions.",
    image: "/images/image1.avif",
    date: "April 14, 2026",
    readTime: "5 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Security camera placement tips",
    category: "Video Security",
    description:
      "Position cameras to reduce blind spots and maximize coverage across critical areas.",
    image: "/images/camera-1.avif",
    date: "April 12, 2026",
    readTime: "4 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Cloud video management benefits",
    category: "Cloud",
    description:
      "See how cloud-managed video can simplify deployment and support multi-site operations.",
    image: "/images/camera-2.avif",
    slug: "martyns-law-in-education",
    date: "April 10, 2026",
    readTime: "6 min read",
  },
  {
    title:
      "Security training for teams",
    category: "Training",
    description:
      "Practical ways to keep security teams aligned with training and operating procedures.",
    image: "/images/image1.avif",
    date: "April 8, 2026",
    readTime: "5 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Perimeter protection basics",
    category: "Perimeter",
    description:
      "Strengthen the first line of defense with layered perimeter protection and monitoring.",
    image: "/images/camera-1.avif",
    date: "April 6, 2026",
    readTime: "4 min read",
    slug: "martyns-law-in-education",
  },
  {
    title:
      "Building safety communications",
    category: "Communications",
    description:
      "Combine security systems with communication workflows for faster, coordinated action.",
    image: "/images/camera-2.avif",
    date: "April 4, 2026",
    readTime: "5 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "AI alerts and triage",
    category: "AI",
    description:
      "Reduce alert fatigue and prioritize events with intelligent triage and alerting.",
    image: "/images/image1.avif",
    date: "April 2, 2026",
    readTime: "6 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "Smarter visitor management",
    category: "Visitor Management",
    description:
      "Improve visitor experiences while maintaining strong security controls and auditability.",
    image: "/images/camera-1.avif",
    date: "March 31, 2026",
    slug: "martyns-law-in-education",
    readTime: "4 min read",
  },
  {
    title:
      "Event investigation workflow",
    category: "Operations",
    description:
      "Build an investigation workflow that helps teams move from alert to resolution quickly.",
    image: "/images/camera-2.avif",
    date: "March 29, 2026",
    readTime: "5 min read",
    slug: "martyns-law-in-education",
  },
  {
    title: "Security program maturity",
    category: "Leadership",
    description:
      "Measure and improve your security program maturity with repeatable checkpoints.",
    image: "/images/image1.avif",
    date: "March 27, 2026",
    readTime: "6 min read",
    slug: "martyns-law-in-education",
  },
];

const POSTS_PER_PAGE = 12;

export default function BlogPage() {
  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages = Math.ceil(
    blogPosts.length / POSTS_PER_PAGE
  );

  const visiblePosts = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      POSTS_PER_PAGE;
    return blogPosts.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE
    );
  }, [currentPage]);

  const goToPage = (page: number) => {
    const next = Math.min(
      Math.max(page, 1),
      totalPages
    );
    setCurrentPage(next);
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-black">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <BlogHeroSection title="Security industry insights, news, and trends" />
        <BlogPostsGrid
          posts={visiblePosts}
          currentPage={currentPage}
        />
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </section>
    </main>
  );
}
