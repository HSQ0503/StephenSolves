import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import type { Features } from "@/types";
import Link from "next/link";

const Features = ({ limit }: { limit?: number }) => {
  const sectionData = getListPage<Features["frontmatter"]>("sections/features.md");
  const finalData = limit
    ? sectionData.frontmatter.features.slice(0, limit)
    : sectionData.frontmatter.features;

  return (
    <>
      {sectionData.frontmatter.enable && (
        <section className="section">
          <div className="container">
            <div className="flex flex-col items-center gap-24 lg:gap-32">
              {finalData &&
                finalData.length &&
                finalData.map((feature, index) => {
                  const { title, badge, subtitle, button, image } = feature;
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      className={`section-container flex-col lg:flex-row items-center gap-10 ${isEven && "lg:flex-row-reverse"
                        }`}
                      key={index}
                    >
                      <div className="section-intro lg:w-[50%]">
                        {badge && (
                          <span className="section-badge inline-block">
                            {badge}
                          </span>
                        )}
                        {title && (
                          <h2 className="title heading-outline">{title}</h2>
                        )}
                        {subtitle && (
                          <p className="subtitle">{subtitle}</p>
                        )}
                        {button.enable && (
                          <Link
                            href={button.link}
                            className="btn btn-primary mt-10"
                          >
                            {button.label}
                          </Link>
                        )}
                      </div>
                      <div className="section-content lg:w-[50%]">
                        <div
                          className={`bg-light rounded-3xl p-8 max-w-[500px] ${isEven ? "mr-auto" : "ml-auto"
                            }`}
                        >
                          <ImageFallback
                            src={image}
                            width={500}
                            height={510}
                            alt={title}
                            className="rounded-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Features;
