import { getListPage } from "@/lib/contentParser";
import AllReviews from "@/partials/AllReviews";
import CallToAction from "@/partials/CallToAction";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import type { ReviewsPage } from "@/types";

export default function ReviewsPage() {
  const pageIndex = getListPage<ReviewsPage["frontmatter"]>("reviews/_index.md");
  const { page_header } = pageIndex.frontmatter;

  return (
    <>
      <SeoMeta {...pageIndex.frontmatter} />
      <PageHeader
        title={page_header.title}
        subtitle={page_header.subtitle}
        button={page_header.button}
        backgroundImages={page_header.background_images}
      />
      <AllReviews />
      <CallToAction />
    </>
  );
}
