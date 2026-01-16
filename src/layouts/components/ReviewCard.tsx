import { markdownify } from "@/lib/utils/textConverter";
import { Reviews } from "@/types";
import StarRatings from "./StarRatings";

interface Props {
  review: Reviews["frontmatter"]["list"][number];
  aosDelay: number;
}

const ReviewCard: React.FC<Props> = ({ review, aosDelay }) => {
  const { name, review: reviewText, stars } = review;
  return (
    <div data-aos="fade-up-sm" data-aos-delay={aosDelay}>
      <div className="border border-border bg-light hover:bg-transparent transition-colors duration-300 p-6 rounded-xl flex flex-col justify-between group h-full">
        <div>
          <StarRatings rating={stars} color="text-secondary" />
          <p
            dangerouslySetInnerHTML={markdownify(reviewText)}
            className="text-text-dark text-lg font-medium mt-6"
          />
        </div>
        <p className="text-base font-medium mt-4" dangerouslySetInnerHTML={markdownify(name)} />
      </div>
    </div>
  );
};

export default ReviewCard;
