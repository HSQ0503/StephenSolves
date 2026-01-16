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
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      required
                      aria-required="true"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="(Optional) For scheduling"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="education_level" className="form-label">
                      Current Education Level *
                    </label>
                    <select
                      id="education_level"
                      name="education_level"
                      className="form-input"
                      required
                      aria-required="true"
                    >
                      <option value="">Select your level</option>
                      <option value="high_school">High School</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="other">Other / Professional</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="math_subject" className="form-label">
                      Math Subject / Course *
                    </label>
                    <input
                      type="text"
                      id="math_subject"
                      name="math_subject"
                      className="form-input"
                      required
                      aria-required="true"
                      placeholder="e.g., Calculus II, Linear Algebra, Statistics"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="goal" className="form-label">
                      Primary Goal *
                    </label>
                    <select
                      id="goal"
                      name="goal"
                      className="form-input"
                      required
                      aria-required="true"
                    >
                      <option value="">What do you need help with?</option>
                      <option value="improve_grades">Improve Grades</option>
                      <option value="exam_prep">Exam Preparation (SAT, GRE, etc.)</option>
                      <option value="homework_help">Homework Help</option>
                      <option value="concept_understanding">Understand Concepts Better</option>
                      <option value="get_ahead">Get Ahead in Class</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="session_format" className="form-label">
                      Preferred Session Format *
                    </label>
                    <select
                      id="session_format"
                      name="session_format"
                      className="form-input"
                      required
                      aria-required="true"
                    >
                      <option value="">Select format</option>
                      <option value="online">Online (Video Call)</option>
                      <option value="in_person">In-Person</option>
                      <option value="either">Either Works</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="message" className="form-label">
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="form-input h-auto"
                      placeholder="Tell me more about your situation - current challenges, upcoming exams, schedule preferences, or anything else that would help me understand your needs."
                    ></textarea>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary py-4 px-7 text-light leading-none w-full"
                  >
                    Request Consultation
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
