import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import BlogSection from "@/partials/BlogSection";
import CallToAction from "@/partials/CallToAction";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { BlogPage, BlogPost } from "@/types";

export default function BlogIndexPage() {
  const posts = getSinglePage<BlogPost["frontmatter"]>("blog");
  const postIndex = getListPage<BlogPage["frontmatter"]>("blog/_index.md");
  const sortedPosts = sortByDate(posts);
  const visiblePosts = sortedPosts.slice(0, config.settings.pagination);
  const headingContent = postIndex.frontmatter.hero;
  const totalPages = Math.ceil(posts.length / config.settings.pagination);

  return (
    <>
      <SeoMeta {...postIndex.frontmatter} />
      <PageHeader title={headingContent?.title} subtitle={headingContent?.description} />

      <section className="section xl:-mt-10">
        <div className="container">
          <div className="section-container">
            <BlogSection posts={visiblePosts} />
            <Pagination section="blog" totalPages={totalPages} />
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
