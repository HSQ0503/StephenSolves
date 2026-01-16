import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import type { Integrations } from "@/types";

const Integrations = () => {
  const integrationsData = getListPage<Integrations["frontmatter"]>(
    "sections/integrations.md"
  );
  const { enable, title, list, subtitle } = integrationsData.frontmatter;

  return (
    <>
      {enable && (
        <section className="section">
          <div className="container">
            <div className="section-container">
              <div className="section-intro text-center lg:col-8 mx-auto ">
                {title && (
                  <h1
                    className="title heading-outline"
                    data-aos="fade-up-sm"
                    data-aos-delay="0"
                    dangerouslySetInnerHTML={markdownify(title)}
                  />
                )}
                {subtitle && (
                  <p
                    className="subtitle text-balance"
                    data-aos="fade-up-sm"
                    data-aos-delay="50"
                    dangerouslySetInnerHTML={markdownify(subtitle)}
                  />
                )}
              </div>
              <div className="section-content">
                <div className="max-w-[830px] mx-auto bottom-t-top-white-gradient ">
                  <div className="flex justify-center flex-wrap gap-12 pb-4">
                    {list.length &&
                      list.map((item, index) => {
                        return (
                          <div
                            data-aos="fade-right-sm"
                            data-aos-delay={index * 50}
                            className="relative -z-10"
                            key={index}
                          >
                            <ImageFallback
                              width={60}
                              height={60}
                              src={item.image}
                              alt={item.imageAlt}
                              className="size-14"
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Integrations;
