import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import dateFormat from "@/lib/utils/dateFormat";
import { plainify } from "@/lib/utils/textConverter";
import { BlogPost } from "@/types";
import Link from "next/link";

interface Props {
  post: BlogPost;
  aosDelay?: number;
}

const BlogCard: React.FC<Props> = ({ post, aosDelay }) => {
  const { content, slug } = post;
  const { title, image, date } = post.frontmatter;
  const { summary_length } = config.settings;

  return (
    <div data-aos="fade-up-sm" data-aos-delay={aosDelay}>
      <div
        className="space-y-5 w-full group border border-transparent hover:border-border p-4 rounded-lg transition-all duration-300"
      >
        <Link href={`/blog/${slug}`}>
          <div className="overflow-hidden rounded-lg relative">
            <ImageFallback
              src={image || "/images/image-placeholder.png"}
              alt={title}
              width={450}
              height={350}
              className="w-full group-hover:scale-105 transition-all duration-300 aspect-[16/10] contrast-75 group-hover:contrast-100"
            />
          </div>
        </Link>
        <div>
          <span className="text-sm font-medium text-text-dark/70 inline-block mb-4">
            {dateFormat(date!, "dd MMM, yyyy")}
          </span>
          <Link href={`/blog/${slug}`}>
            <h3 className="text-h5 mb-3 hover:text-secondary">{title}</h3>
          </Link>
          {content && (
            <p
              className="text-base text-text-dark/60 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: plainify(content.slice(0, summary_length)),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
