import { markdownify } from '@/lib/utils/textConverter';
import type { Pricing } from '@/types';
import Link from 'next/link';

const PricingSection = ({ isPageHeader, data, children }: { isPageHeader?: boolean, data: Pricing, children?: React.ReactNode }) => {
  const { title, subtitle, rate, rate_period, rate_prefix, features, multi_session_note, button } = data.frontmatter;

  return (
    <section className="section">
      <div className="container">
        <div className="bg-light rounded-3xl py-10 md:py-14 px-6 relative overflow-hidden">
          {/* Decorative background circles */}
          <div className="absolute inset-0 -z-0 pointer-events-none">
            <div className="absolute -top-1/4 -right-1/4 w-[60%] aspect-square rounded-full border border-white/10" />
            <div className="absolute -bottom-1/3 -left-1/4 w-[50%] aspect-square rounded-full border border-white/10" />
          </div>

          <div className="relative z-10">
            {!isPageHeader && (
              <div className="text-center lg:col-8 mx-auto text-balance mb-8">
                <h2
                  className="mb-2 heading-outline"
                  data-aos="fade-up-sm"
                  data-aos-delay="0"
                  dangerouslySetInnerHTML={markdownify(title)}
                />
                <p
                  className="text-lg text-white/80"
                  data-aos="fade-up-sm"
                  data-aos-delay="50"
                  dangerouslySetInnerHTML={markdownify(subtitle)}
                />
              </div>
            )}

            <div className="max-w-2xl mx-auto" data-aos="fade-up-sm" data-aos-delay="100">
              <div className="rounded-2xl border border-white/15 bg-[#7aacd0] backdrop-blur-sm px-8 md:px-10 py-6 md:py-8 shadow-lg">
                {/* Price + subtitle inline */}
                <div className="text-center mb-5">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-h2 md:text-h1 font-bold text-white">{rate_prefix}{rate}</span>
                    <span className="text-xl text-white/70">/{rate_period}</span>
                  </div>
                  <p className="mt-1 text-white/70 text-sm">All levels — high school through graduate</p>
                </div>

                <hr className="border-white/15 mb-5" />

                {/* Features - 3 columns on larger screens */}
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 mb-5">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-x-2">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-white text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Multi-session note + CTA side by side */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-white/10">
                  <p className="text-xs text-white/70 sm:flex-1">{multi_session_note}</p>
                  {button.enable && (
                    <Link href={button.link} className="btn btn-primary shrink-0 text-center">
                      <span>{button.label}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {children && (
          <div className="pt-24 xl:pt-32 max-w-[1000px] mx-auto">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
