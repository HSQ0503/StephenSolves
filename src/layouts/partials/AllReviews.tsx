import ReviewCard from "@/components/ReviewCard";
import { getListPage } from "@/lib/contentParser";
import type { Reviews } from "@/types";

const AllReviews = () => {
  const reviewsSectionData = getListPage<Reviews["frontmatter"]>("sections/reviews.md");
  const { enable, list } = reviewsSectionData.frontmatter;

  return (
    <>
      {enable && (
        <section className="section">
          <div className="container">
            <div className="section-container">
              <div className="section-content">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
                  {list &&
                    list.map((review, index: number) => {
                      return (
                        <ReviewCard key={index} review={review} aosDelay={50 * index} />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AllReviews;
