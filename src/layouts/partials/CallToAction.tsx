import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { CTA } from "@/types";
import Link from "next/link";

const CallToAction = () => {
  const ctaSectionData = getListPage<CTA["frontmatter"]>("sections/call-to-action.md");
  const { enable, title, description, button, rotating_icons } =
    ctaSectionData.frontmatter;

  return (
    <>
      {enable && (
        <section className="section-light py-[10rem] lg:py-[18rem] mb-0 relative isolate overflow-hidden group">
          <div className="container ">
            <div className="section-container ">
              <div className="section-intro text-center lg:col-8 mx-auto text-balance space-y-6 relative before:absolute before:inset-0 before:bg-light before:w-full before:mx-auto before:rounded-full before:blur-xl before:-z-10 z-10 ">
                {title && (
                  <h2
                    className=" text-h1 heading-outline"
                    dangerouslySetInnerHTML={markdownify(title)}
                  />
                )}
                {description && (
                  <p
                    className="text-lg"
                    dangerouslySetInnerHTML={markdownify(description)}
                  />
                )}

                {button.enable && (
                  <Link href={button.link} className="btn btn-primary">
                    {button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* BG CIRCLES */}
          <div className="nested-circles group-hover:scale-90">
            <div className="nested-circle inf-rotate">
              {rotating_icons.slice(0, 4).map((image, index) => (
                <div className="nested-circle-icon" key={index}>
                  <ImageFallback
                    width={120}
                    height={120}
                    src={image}
                    alt=""
                    className="text-text-dark rounded-full w-12 lg:w-16 aspect-square"
                  />
                </div>
              ))}
            </div>
            <div className="nested-circle inf-rotate">
              {rotating_icons.slice(4, 8).map((image, index) => (
                <div className="nested-circle-icon" key={index}>
                  <ImageFallback
                    width={70}
                    height={70}
                    src={image}
                    alt=""
                    className="text-text-dark rounded-full w-8 lg:w-12 aspect-square"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
