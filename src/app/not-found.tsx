import RightArrowBtn from "@/components/RightArrowBtn";
import ImageFallback from "@/helpers/ImageFallback";
import SeoMeta from "@/partials/SeoMeta";

const NotFound = async () => {
  return (
    <>
      <SeoMeta title={"Page Not Found"} />
      <section className="ph-spacing text-center">
        <div className="relative">
          <div className="container">
            <div className="flex flex-col items-center lg:col-8 mx-auto gap-10 mt-8">
              <div data-aos="fade-up-sm" data-aos-delay="100">
                <ImageFallback
                  src="/images/404.png"
                  width={600}
                  height={460}
                  className="w-[300px] lg:w-auto"
                  alt="404 Image"
                />
              </div>
              <div>
                <h1
                  className="text-h3 md:text-h2 mb-4"
                  data-aos="fade-up-sm"
                  data-aos-delay="150"
                >
                  Oops, Your Page is Lost!
                </h1>
                <p data-aos="fade-up-sm" data-aos-delay="200">
                  The page you are looking for cannot be found. Please check the URL
                  and try again.
                </p>
              </div>
              <RightArrowBtn
                data-aos="fade-up-sm"
                data-aos-delay="200"
                aria-label={"Go back to Home"}
                link={"/"}
                label={"Go back to Home"}
                className="btn btn-primary"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
