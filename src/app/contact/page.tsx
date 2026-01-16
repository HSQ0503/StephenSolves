import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { ContactPage } from "@/types";

export default function ContactPageComponent() {
  const pageIndex = getListPage<ContactPage["frontmatter"]>("contact/_index.md");
  const { page_header } = pageIndex.frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <SeoMeta {...pageIndex.frontmatter} />
      <PageHeader title={page_header.title} subtitle={page_header.subtitle} />
      <section className="section -mt-10">
        <div className="container">
          <div className="section-container">
            <div className="max-w-[700px] mx-auto w-full">
              <form
                action={contact_form_action}
                method="post"
                data-aos="fade-up-sm"
                data-aos-delay="200"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="fullname" className="form-label">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      required
                      aria-required="true"
                      className="form-input"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-input"
                      required
                      aria-required="true"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-input"
                      required
                      aria-required="true"
                      placeholder="Write Your Subject Here"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="message" className="form-label">
                      Write Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="form-input h-auto"
                      required
                      aria-required="true"
                      placeholder="Write Your Message Here"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary py-4 px-7 text-light leading-none w-full"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
