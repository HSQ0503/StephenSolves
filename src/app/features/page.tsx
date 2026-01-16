import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import FeaturesComponent from "@/partials/Features";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import Testimonial from "@/partials/Testimonial";
import type { FeaturesPage, Testimonial as TT } from "@/types";

export default function FeaturesPage() {
  const pageIndex = getListPage<FeaturesPage["frontmatter"]>("features/_index.md");
  const testimonialData = getListPage<TT["frontmatter"]>("sections/testimonial.md");
  const { page_header } = pageIndex.frontmatter;

  return (
    <>
      <SeoMeta {...pageIndex.frontmatter} />
      <PageHeader title={page_header.title} subtitle={page_header.subtitle} />
      <FeaturesComponent />
      <Testimonial data={testimonialData} />
      <CallToAction />
    </>
  );
}
