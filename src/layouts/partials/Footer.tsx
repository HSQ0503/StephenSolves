import Social from "@/components/Social";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { footer_column_1, footer_column_2 } = menu;

  function replaceYear(text: string) {
    const year = new Date().getFullYear();
    return text.replace("{year}", year.toString());
  }

  return (
    <footer className="bg-body border-t border-border">
      <div className="container">
        <div className="flex flex-col-reverse md:flex-row">
          {/* LEFT SIDE */}
          <div
            className="md:w-[44%] py-10 xl:py-32"
            data-aos="fade-up-sm"
            data-aos-delay="0"
          >
            <div>
              <h2 className="text-h5 mb-5">Subscribe our newsletter</h2>
              <form action="#" className="flex items-stretch flex-wrap gap-2">
                <input
                  className="h-14 bg-light text-text-dark rounded-lg border-transparent focus:border-border focus:ring-0 px-6 w-full sm:w-[280px]"
                  type="text"
                  name="email"
                  id="email"
                  required
                  placeholder="Your Email"
                />
                <button
                  type="submit"
                  className="btn btn-primary rounded-lg w-full sm:w-auto h-14"
                >
                  Sign Up
                </button>
              </form>
              <p
                className="mt-4"
                dangerouslySetInnerHTML={markdownify(
                  replaceYear(config.params.footer_newsletter_consent)
                )}
              />
              {config.params.copyright && (
                <div
                  className="mt-14 md:mt-40"
                  dangerouslySetInnerHTML={markdownify(replaceYear(config.params.copyright))}
                />
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:pl-14 lg:pl-40 md:w-[56%] md:border-l border-border py-24 xl:py-32">
            <div className="grid md:grid-cols-2 gap-10">
              <ul
                className="flex flex-col gap-y-4"
                data-aos="fade-up-sm"
                data-aos-delay="100"
              >
                {footer_column_1 &&
                  footer_column_1.map((item) => (
                    <li key={item.name}>
                      <Link
                        className="hover:text-secondary transition-colors duration-300 inline text-h5 text-text-dark font-semibold leading-none"
                        href={item.url}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <ul
                className="flex flex-col gap-y-4"
                data-aos="fade-up-sm"
                data-aos-delay="200"
              >
                {footer_column_2 &&
                  footer_column_2.map((item) => (
                    <li key={item.name}>
                      <Link
                        className="hover:text-secondary transition-colors duration-300 inline text-lg text-text font-normal leading-none"
                        href={item.url}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div
              className="flex flex-wrap gap-10 justify-between items-center mt-14 md:mt-40"
              data-aos="fade-up-sm"
              data-aos-delay="0"
            >
              {config.params.footer_text && (
                <p
                  className="transition-colors duration-300 inline text-xl text-text  leading-none font-medium"
                  data-aos="fade-up-sm"
                  data-aos-delay="100"
                  dangerouslySetInnerHTML={markdownify(config.params.footer_text)}
                />
              )}
              <div data-aos="fade-up-sm" data-aos-delay="200">
                <Social source={social.main} className="flex gap-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;