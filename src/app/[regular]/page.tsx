import MDXContent from "@/helpers/MDXContent";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import type { RegularPage } from "@/types";
import dayjs from "dayjs";
import { notFound } from "next/navigation";


// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const getRegularPages = getSinglePage<RegularPage["frontmatter"]>("pages");

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }));

  return regularPages;
};

const RegularPage = async (props: { params: Promise<{ regular: string }> }) => {
  const { regular } = await props.params;
  const page = getListPage<RegularPage["frontmatter"]>(`pages/${regular}.md`);
  const { title, meta_title, description, image } = page.frontmatter;
  const lastModified = dayjs(page.frontmatter?.lastModified).format(
    "MMMM DD, YYYY"
  );

  if (!page) return notFound();

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} subtitle={`Last Modified: ${lastModified}`} />
      <section className="section">
        <div className="container">
          <div className="content max-w-[1240px] mx-auto" data-aos="fade-up-sm" data-aos-delay="200">
            <MDXContent content={page.content} />
          </div>
        </div>
      </section>
    </>
  );
}


export default RegularPage;
