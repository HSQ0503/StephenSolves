import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import BlogSection from "@/partials/BlogSection";
import CallToAction from "@/partials/CallToAction";
import PageHeader from "@/partials/PageHeader";
import type { BlogPage, BlogPost } from "@/types";

export const dynamicParams = false;
export function generateStaticParams(): { slug: string }[] {
  const posts = getSinglePage<BlogPost["frontmatter"]>("blog");
  const totalPages = Math.ceil(posts.length / config.settings.pagination);
  const paths = [];

  for (let i = 1; i <= totalPages; i++) {
    paths.push({ slug: i.toString() });
  }
  return paths;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getSinglePage<BlogPost["frontmatter"]>("blog");
  const postIndex = getListPage<BlogPage["frontmatter"]>("blog/_index.md");
  const headingContent = postIndex.frontmatter.hero;
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / config.settings.pagination);
  const currentPage = slug && !isNaN(Number(slug)) ? Number(slug) : 1;
  const indexOfLastPost = currentPage * config.settings.pagination;
  const indexOfFirstPost = indexOfLastPost - config.settings.pagination;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <PageHeader title={headingContent?.title} subtitle={headingContent?.description} />
      <section className="section xl:-mt-10">
        <div className="container">
          <div className="section-container">
            <BlogSection posts={currentPosts} />
            <Pagination
              section={"blog"}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
