import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import type { TrustedBrands } from "@/types";

const TrustedBrands = ({ endsColor }: { endsColor: string }) => {
  const { list: brandsList, title } = getListPage<TrustedBrands>(
    "sections/trusted-brands.md"
  ).frontmatter;

  return (
    <div className="flex items-center gap-5" data-aos="fade-up-sm">
      <p
        className="text-h6 min-w-max hidden md:block text-text-dark pr-10"
        dangerouslySetInnerHTML={markdownify(title)}
      />
      <div
        className={[
          "inf-slider overflow-hidden",
          endsColor === "homepage-hero" ? "brands-gradient" : "",
          endsColor === "white" ? "brands-gradient-white" : "",
        ].join(" ")}
        data-inf-scroll-speed="80"
        data-inf-direction="normal"
        data-inf-slide-pause-on-hover="true"
      >
        <div className="inf-slide-track">
          {brandsList?.map((brand) => (
            <div className="inf-slide ml-10" key={brand.brand}>
              <ImageFallback
                width={200}
                height={32}
                src={brand.logo}
                alt={brand.brand}
                className="object-contain max-h-8 h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBrands;
