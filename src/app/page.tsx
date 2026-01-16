import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import Faq from "@/partials/Faq";
import FeatureCarousel from "@/partials/FeatureCarousel";
import Features from "@/partials/Features";
import HomeBanner from "@/partials/HomeBanner";
import Integrations from "@/partials/Integrations";
import MoreFeatures from "@/partials/MoreFeatures";
import PricingSection from "@/partials/PricingSection";
import SeoMeta from "@/partials/SeoMeta";
import Testimonial from "@/partials/Testimonial";
import UserStats from "@/partials/UserStats";
import type { Testimonial as TT, FeatureCarousel as TFC, Pricing } from "@/types";

export default function HomePage() {
  const featureCarouselData = getListPage<TFC["frontmatter"]>(
    "sections/features-carousel.md"
  );
  const testimonialData = getListPage<TT["frontmatter"]>("sections/testimonial.md");

  const pricingData = getListPage<Pricing["frontmatter"]>('sections/pricing.md');

  return (
    <>
      <SeoMeta />
      <HomeBanner />
      <UserStats />
      <FeatureCarousel data={featureCarouselData} />
      <Features limit={2} />
      <MoreFeatures />
      <Integrations />
      <Testimonial data={testimonialData} />
      <PricingSection isPageHeader={false} data={pricingData} />
      <Faq />
      <CallToAction />
    </>
  );
}
