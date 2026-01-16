import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/types";

interface Props {
  posts: BlogPost[];
}

const BlogSection = ({ posts }: Props) => {
  return (
    <div className="grid md:grid-cols-2 justify-center xl:grid-cols-3 gap-12 xl:gap-14">
      {posts?.map((post, index) => {
        const aosDelay = 100 * (index % 3);
        return <BlogCard key={post.slug} post={post} aosDelay={aosDelay} />;
      })}
    </div>
  );
};

export default BlogSection;
