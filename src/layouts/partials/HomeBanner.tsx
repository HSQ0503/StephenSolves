import RightArrowBtn from "@/components/RightArrowBtn";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { HomePage } from "@/types";
import Link from "next/link";
import TrustedBrands from "./TrustedBrands";

const HomeBanner = () => {
  const homePageData =
    getListPage<HomePage["frontmatter"]>("homepage/_index.md");
  const { buttons, image, title, badge } = homePageData.frontmatter.banner;

  return (
    <section className="ph-spacing bg-homepage-hero">
      <div className="container text-center">
        <div className="overflow-hidden">
          <div className="lg:col-8 mx-auto pt-5">
            {badge.enable && (
              <div data-aos="fade-up-sm">
                <div className="flex flex-wrap items-center border border-text-dark/10 p-[5px] rounded-full justify-center max-w-max mb-6 mx-auto">
                  <div className="flex items-center">
                    {badge.images &&
                      badge.images.length &&
                      badge.images.map((img, index) => (
                        <ImageFallback
                          key={index}
                          width={60}
                          height={60}
                          className="w-7 aspect-square rounded-full border-2 border-homepage-hero -mr-2 bg-light"
                          src={img}
                          alt="Badge"
                        />
                      ))}
                  </div>
                  <span className="text-text-dark text-sm md:text-base font-medium px-4">
                    {badge.label}
                  </span>
                </div>
              </div>
            )}

            <h1
              data-aos="fade-up-sm"
              data-aos-delay="150"
              className="mb-10 text-h2-sm sm:text-h2 lg:text-h1 heading-outline"
              dangerouslySetInnerHTML={markdownify(title)}
            />
            <div
              data-aos="fade-up-sm"
              data-aos-delay="100"
              className="flex flex-wrap justify-center gap-4"
            >
              {buttons.map((button, index) => {
                const isEven = index % 2 === 0;
                return button.enable && isEven ? (
                  <Link
                    key={index}
                    href={button.link}
                    className={`${isEven ? "btn btn-secondary" : "btn btn-primary"}`}
                  >
                    {button.label}
                  </Link>
                ) : (
                  <RightArrowBtn
                    key={index}
                    aria-label={button.label}
                    link={button.link}
                    label={button.label}
                    className="btn btn-primary"
                  />
                );
              })}
            </div>
          </div>
          <div className="flex justify-center hero-image-gradient mt-5 relative isolate">
            <div
              data-aos="zoom-in-sm"
              data-aos-delay="250"
              data-aos-duration="2000"
              className="absolute inset-0 -z-10"
            >
              <div className="circle-bg">
                <div className="circle-bg-inner">
                  <div className="circle-bg-inner">
                    <div className="circle-bg-inner"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up-sm"
              data-aos-delay="300"
              data-aos-duration="1000"
              className="-z-10"
            >
              <ImageFallback
                loading="eager"
                src={image}
                alt="Banner Image"
                width={980}
                height={902}
                className="w-full max-w-[980px] mt-8"
              />
            </div>
          </div>
        </div>
        <div className="-translate-y-5 md:-translate-y-10 max-w-[1080px] mx-auto py-10">
          <TrustedBrands endsColor="homepage-hero" />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
