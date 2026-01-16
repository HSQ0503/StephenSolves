import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import Accordion from "@/shortcodes/Accordion";
import type { Faq } from "@/types";
import Link from "next/link";

const Faq = () => {
  const faq = getListPage<Faq["frontmatter"]>("sections/faq.md");

  return (
    <section className="section" id="faq_section">
      <div className="container">
        <div className="section-container gap-10">
          <div className="section-intro text-center">
            <h2
              dangerouslySetInnerHTML={markdownify(faq.frontmatter.title)}
              className="title heading-outline"
              data-aos="fade-up-sm"
              data-aos-delay="0"
            />
          </div>
          <div className="section-content lg:col-10 mx-auto">
            {faq.frontmatter.list.map((item, index) => (
              <div key={index} data-aos="fade-up-sm" data-aos-delay={100 * index}>
                <Accordion title={item.question}>
                  <div dangerouslySetInnerHTML={markdownify(item.answer)} />
                </Accordion>
              </div>
            ))}
            {faq.frontmatter.haveQuestions.enable && (
              <div
                className="text-center mt-10"
                data-aos="fade-up-sm"
                data-aos-delay="0"
              >
                <p>
                  {faq.frontmatter.haveQuestions.text}{" "}
                  <Link className="text-secondary" href={faq.frontmatter.haveQuestions.anchor.link}>
                    {faq.frontmatter.haveQuestions.anchor.label}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
