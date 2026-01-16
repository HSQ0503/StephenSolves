import DynamicIcon from "@/helpers/DynamicIcon";
import { getListPage } from "@/lib/contentParser";
import type { MoreFeatures } from "@/types";
import Link from "next/link";

const MoreFeatures = () => {
  const sectionData = getListPage<MoreFeatures['frontmatter']>("sections/more-features.md");
  const { enable, title, list, subtitle, button } = sectionData.frontmatter;

  return (
    <>
      {enable && (
        <section className="section-light">
          <div className="container">
            <div className="section-container">
              <div className="section-intro text-center">
                {title && (
                  <h2 className="title heading-outline" data-aos="fade-up-sm" data-aos-delay="0">
                    {title}
                  </h2>
                )}
              </div>
              <div className="section-content">
                {list && list.length && (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-14">
                    {list.map((item, index) => {
                      return (
                        <div
                          className="bg-body rounded-xl p-6 flex items-start gap-5 transition-colors duration-300"
                          data-aos="fade-up-sm"
                          data-aos-delay={index * 100}
                          key={index}
                        >
                          <div className="size-6">
                            <DynamicIcon
                              icon={item.icon}
                              width={30}
                              height={30}
                              className="text-secondary -mt-1 text-3xl feature-pagination-icon"
                            />
                          </div>
                          <div className="flex flex-col gap-3">
                            <p className="text-h6 text-text-dark leading-snug font-semibold">
                              {item.title}
                            </p>
                            <p className="text-text/80">{item.subtitle}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="lg:col-8 mx-auto text-center">
                  {subtitle && (
                    <p
                      className="text-lg font-medium text-text-dark text-balance"
                      data-aos="fade-up-sm"
                      data-aos-delay="100"
                    >
                      {subtitle}
                    </p>
                  )}
                  {button.enable && (
                    <Link
                      href={button.link}
                      className="btn btn-primary mt-10"
                      data-aos="fade-up-sm"
                      data-aos-delay="150"
                    >
                      {button.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MoreFeatures;
