"use client";

import { markdownify } from '@/lib/utils/textConverter';
import type { Pricing } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PricingSection = ({ isPageHeader, data, children }: { isPageHeader?: boolean, data: Pricing, children?: React.ReactNode }) => {
  const [isYearly, setIsYearly] = useState(false);
  const { title, subtitle, plans, plans_labels } = data.frontmatter;

  // Function to animate counter
  function animateCounter(element: HTMLElement, endValue: number) {
    let startValue = 0;
    const duration = 300;
    let startTime: number | null = null;

    function step(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const value =
        Math.min(progress / duration, 1) * (endValue - startValue) +
        startValue;
      element.innerHTML = Math.ceil(value).toString();
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Handle pricing toggle
  const handlePricingToggle = () => {
    setIsYearly(!isYearly);
  };

  // Apply toggle effects when isYearly changes
  useEffect(() => {
    const numbers = document.querySelectorAll<HTMLDivElement>(".data-count");
    const yearlyElements = document.querySelectorAll<HTMLElement>(".text-yearly");
    const monthlyElements = document.querySelectorAll<HTMLElement>(".text-monthly");

    if (isYearly) {
      // Switch to yearly pricing
      numbers.forEach(function (number) {
        const yearlyCount = number.getAttribute("data-count-yearly");
        if (yearlyCount) {
          number.innerHTML = yearlyCount;
          animateCounter(number, parseInt(yearlyCount, 10));
        }
      });

      // Toggle visibility of period text
      yearlyElements.forEach(el => {
        el.classList.remove("hidden");
        el.classList.add("block");
      });

      monthlyElements.forEach(el => {
        el.classList.add("hidden");
        el.classList.remove("block");
      });
    } else {
      // Switch to monthly pricing
      numbers.forEach(function (number) {
        const monthlyCount = number.getAttribute("data-count-monthly");
        if (monthlyCount) {
          number.innerHTML = monthlyCount;
          animateCounter(number, parseInt(monthlyCount, 10));
        }
      });

      // Toggle visibility of period text
      monthlyElements.forEach(el => {
        el.classList.remove("hidden");
        el.classList.add("block");
      });

      yearlyElements.forEach(el => {
        el.classList.add("hidden");
        el.classList.remove("block");
      });
    }
  }, [isYearly]);

  return (
    <>
      <section className="section">
        <div className="container">
          <div
            className={`mb-9 lg:mb-8 flex ${isPageHeader ? "justify-center -mt-10" : "flex-col items-center gap-14"
              }`}
          >
            {/* LEFT SIDE */}
            {
              !isPageHeader && (
                <div className="text-center lg:col-8 mx-auto text-balance">
                  <h2 className="mb-3 heading-outline" data-aos="fade-up-sm" data-aos-delay="0" dangerouslySetInnerHTML={markdownify(title)} />
                  <p
                    data-aos="fade-up-sm"
                    data-aos-delay="50"
                    dangerouslySetInnerHTML={markdownify(subtitle)}
                  />
                </div>
              )
            }

            {/* RIGHT TOGGLER */}
            <div
              className="text-center"
              data-aos={isPageHeader ? "fade-up-sm" : "fade-up-sm"}
              data-aos-delay={isPageHeader ? "100" : "100"}
            >
              <div className="flex items-center gap-4">
                <span className="text-base text-text-dark font-medium"
                >{plans_labels[0]}</span>
                <label
                  className="inline-flex items-center cursor-pointer"
                  htmlFor="pricing-switch"
                >
                  <input
                    type="checkbox"
                    checked={isYearly}
                    onChange={handlePricingToggle}
                    id="pricing-switch"
                    aria-label="pricing switch"
                    className="sr-only peer pricing-check"
                  />
                  <div
                    className="transition-all duration-1000 relative w-[48px] h-[24px] bg-white border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[22px] rtl:peer-checked:after:-translate-x-[20px] peer-checked:after:border-secondary after:content-[''] after:absolute after:top-[2px] after:start-[3px] after:bg-secondary after:border-gray-300 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all after:duration-500 after:ease-in-out peer-checked:bg-secondary/20"
                  >
                  </div>
                </label>
                <span className="text-base text-text-dark font-medium"
                >{plans_labels[1]}</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-6">
            {
              plans &&
              plans.length > 0 &&
              plans.map((plan, index) => {
                const isEvenIndex = index % 2 !== 0;

                return (
                  <div
                    key={index}
                    data-aos="fade-up-sm"
                    data-aos-delay={index * 100}
                    className={`p-8 rounded-xl flex flex-col justify-between relative border border-border ${isEvenIndex ? "bg-light text-text-dark border-text-dark" : "bg-body text-text-dark"
                      }`}
                  >
                    <div>
                      <h3 className="h5 mb-2">
                        <span dangerouslySetInnerHTML={markdownify(plan.title)} />
                      </h3>
                      <p
                        className={`text-text/80 mb-8 ${isEvenIndex ? "bg-light text-text-dark border-text-dark" : "bg-body text-text-dark"
                          }`}
                        dangerouslySetInnerHTML={markdownify(plan.description)}
                      />
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        {/* PRICE NUMBERS */}
                        <div className="flex items-baseline gap-2">
                          <h3 className="flex items-center text-text-dark text-h1">
                            <span>{plan.price_prefix}</span>
                            <span
                              className="data-count"
                              data-count-yearly={plan.price.yearly.amount}
                              data-count-monthly={plan.price.monthly.amount}
                              dangerouslySetInnerHTML={{ __html: isYearly ? plan.price.yearly.amount.toString() : plan.price.monthly.amount.toString() }}
                            />
                          </h3>
                          <div className="flex flex-col gap-1 text-text">
                            <span className={`text-monthly ${isYearly ? 'hidden' : 'block'}`}>
                              /{plan.price.monthly.period}
                            </span>
                            <span className={`text-yearly ${isYearly ? 'block' : 'hidden'}`}>
                              /{plan.price.yearly.period}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr className="mt-4 mb-8 border-border/70" />
                      <ul className="flex flex-col gap-4">
                        {plan.features &&
                          plan.features.length > 0 &&
                          plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-x-2 text-text-dark">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                fill="none"
                              >
                                <path
                                  stroke="#5A45FE"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M4.167 12.583s1.25 0 2.916 2.917c0 0 4.633-7.639 8.75-9.167"
                                />
                              </svg>
                              <span className="text-text-dark font-medium">
                                {feature}
                              </span>
                            </li>
                          ))}
                      </ul>

                      {/* CTA BUTTON */}
                      {plan.button.enable && (
                        <Link
                          href={plan.button.link}
                          className={`btn w-full mt-6 text-center ${isEvenIndex ? "btn-primary" : "btn-outline-secondary"}`}
                        >
                          <span>{plan.button.label}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            }
          </div>


          {
            children && (
              <div className="pt-24 xl:pt-32 max-w-[1000px] mx-auto">
                {children}
              </div>
            )
          }
        </div>
      </section>
    </>
  );
};

export default PricingSection;
