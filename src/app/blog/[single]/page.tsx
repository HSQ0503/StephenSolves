import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import { sortByDate } from "@/lib/utils/sortFunctions";
import { markdownify } from "@/lib/utils/textConverter";
import BlogSection from "@/partials/BlogSection";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import { BlogPost } from "@/types";
import { notFound } from "next/navigation";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: BlogPost[] = getSinglePage("blog");

  const paths = posts.map((post) => ({
    single: post.slug!,
  }));

  return paths;
};

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ single: string }>;
}) => {
  const { single } = await params;
  const posts = getSinglePage<BlogPost["frontmatter"]>("blog");
  const post = posts.find((p) => p.slug === single);

  if (!post) return notFound();

  const { date, image, title } = post.frontmatter;
  const sortedPosts = sortByDate(posts);
  const recentPosts = sortedPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <SeoMeta {...post.frontmatter} />
      <section className="ph-spacing mb-0 pb-10 xl:pb-24 section">
        <div className="container text-center">
          <div className="flex flex-col items-center gap-16 lg:gap-28 max-w-[1130px] mx-auto">
            <div className="space-y-3 md:space-y-5 mx-auto">
              {date && (
                <p
                  className="text-text-dark/70 mt-4 text-base"
                  dangerouslySetInnerHTML={{ __html: dateFormat(date, "MMM dd, yyyy") }}
                />
              )}
              <h1
                className="text-h2-sm md:text-h2 xl:text-h1 text-balance"
                dangerouslySetInnerHTML={markdownify(title)}
              />
            </div>
            {image && (
              <div>
                <ImageFallback
                  src={image}
                  alt={title}
                  width={1024}
                  height={768}
                  className="size-full object-cover rounded-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="content max-w-[1024px] mx-auto">
            <MDXContent content={post.content} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-container">
            <div className="section-intro text-center">
              <h3 className="text-h3-sm">Read More Articles</h3>
            </div>
            <div className="section-content">
              <BlogSection posts={recentPosts} />
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}

export default BlogPostPage;
