import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import Faq from "@/partials/Faq";
import MoreFeatures from "@/partials/MoreFeatures";
import PageHeader from "@/partials/PageHeader";
import PricingSection from "@/partials/PricingSection";
import SeoMeta from "@/partials/SeoMeta";
import Testimonial from "@/partials/Testimonial";
import TrustedBrands from "@/partials/TrustedBrands";
import type { Pricing, PricingPage, Testimonial as TT } from "@/types";

export default function PricingPage() {
  const pageIndex = getListPage<PricingPage["frontmatter"]>("pricing/_index.md");
  const pricingData = getListPage<Pricing["frontmatter"]>('sections/pricing.md');
  const testimonialData = getListPage<TT["frontmatter"]>("sections/testimonial.md");
  const { page_header } = pageIndex.frontmatter;

  return (
    <>
      <SeoMeta {...pageIndex.frontmatter} />
      <PageHeader title={page_header.title} subtitle={page_header.subtitle} />
      <PricingSection isPageHeader data={pricingData}>
        <TrustedBrands endsColor="white" />
      </PricingSection>
      <MoreFeatures />
      <Testimonial data={testimonialData} />
      <Faq />
      <CallToAction />
    </>
  );
}
