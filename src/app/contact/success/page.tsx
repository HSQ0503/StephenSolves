import Link from "next/link";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";

export default function ContactSuccessPage() {
  return (
    <>
      <SeoMeta
        title="Message Sent | StephenSolves"
        meta_title="Message Sent | StephenSolves"
        description="Thank you for reaching out. Stephen will respond within 24 hours."
      />
      <PageHeader
        title="Message Sent Successfully!"
        subtitle="Thank you for reaching out. Stephen will review your inquiry and respond within 24 hours to schedule your free consultation."
      />
      <section className="section -mt-10">
        <div className="container">
          <div className="section-container">
            <div className="max-w-[600px] mx-auto text-center" data-aos="fade-up-sm">
              <div className="mb-8">
                <svg
                  className="w-24 h-24 mx-auto text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4">What happens next?</h2>
              <p className="text-dark/70 dark:text-light/70 mb-8">
                Check your email for a confirmation. Stephen will personally review your inquiry
                and reach out to discuss your goals and schedule your first session.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="btn btn-primary py-3 px-6 text-light leading-none"
                >
                  Back to Home
                </Link>
                <Link
                  href="/pricing"
                  className="btn btn-outline-primary py-3 px-6 leading-none"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
