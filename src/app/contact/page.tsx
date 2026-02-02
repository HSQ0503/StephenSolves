import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { ContactPage } from "@/types";
import ContactForm from "./ContactForm";

export default function ContactPageComponent() {
  const pageIndex = getListPage<ContactPage["frontmatter"]>("contact/_index.md");
  const { page_header } = pageIndex.frontmatter;

  return (
    <>
      <SeoMeta {...pageIndex.frontmatter} />
      <PageHeader title={page_header.title} subtitle={page_header.subtitle} />
      <section className="section -mt-10">
        <div className="container">
          <div className="section-container">
            <div className="max-w-[700px] mx-auto w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
