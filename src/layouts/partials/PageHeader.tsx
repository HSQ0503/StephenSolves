import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

interface Props {
  title?: string;
  subtitle?: string;
  button?: {
    enable: boolean;
    link: string;
    label: string;
  };
  backgroundImages?: {
    enable: boolean;
    image_1: string;
    image_2: string;
    image_3: string;
  };
}

const PageHeader = ({
  title = "",
  subtitle = "",
  button,
  backgroundImages,
}: Props) => {

  return (
    <section className="ph-spacing bg-body relative">
      <div className="container text-center lg:col-8 mx-auto relative z-20">
        <div className="rounded-2xl px-8 py-14">
          <h1
            data-aos="fade-up-sm"
            data-aos-delay="0"
            dangerouslySetInnerHTML={markdownify(title)}
            className="font-semibold mb-4 text-balance heading-outline"
          />
          <p
            data-aos="fade-up-sm"
            data-aos-delay="50"
            dangerouslySetInnerHTML={markdownify(subtitle)}
            className="text-lg xl:w-[60%] xl:mx-auto"
          />
          {
            button && button.enable && (
              <Link data-aos="fade-up-sm"
                data-aos-delay="100"
                href={button.link}
                className="btn btn-primary mt-9"
                target={
                  /^(http|https|www|mailto)/.test(button.link) ? "_blank" : "_self"
                }
              >
                {button.label}
              </Link>
            )
          }
        </div>
      </div>

      {
        backgroundImages && backgroundImages.enable && (
          <div className="absolute inset-0 z-10">
            <div className="absolute top-[15rem] left-[8%]">
              <div data-aos="zoom-in-sm" data-aos-delay="150">
                <ImageFallback
                  width={80}
                  height={80}
                  src={backgroundImages.image_1}
                  alt=""
                  className="w-[30px] lg:w-[70px] aspect-square rounded-full "
                />
              </div>
            </div>
            <div className="absolute top-[10rem] right-[20%]">
              <div data-aos="zoom-in-sm" data-aos-delay="200">
                <ImageFallback
                  width={80}
                  height={80}
                  src={backgroundImages.image_2}
                  alt=""
                  className="w-[30px] lg:w-[50px] aspect-square rounded-full  "
                />
              </div>
            </div>
            <div className="absolute bottom-[5rem] right-[6rem] lg:right-[10rem]">
              <div data-aos="zoom-in-sm" data-aos-delay="300">
                <ImageFallback
                  width={80}
                  height={80}
                  src={backgroundImages.image_3}
                  alt=""
                  className="w-[40px] lg:w-[60px] aspect-square rounded-full  "
                />
              </div>
            </div>
          </div>
        )
      }
    </section>
  );
};

export default PageHeader;
