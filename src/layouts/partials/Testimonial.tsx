"use client";

import StarRatings from "@/components/StarRatings";
import { initInfiniteSliders } from "@/lib/utils/infSlider";
import { markdownify } from "@/lib/utils/textConverter";
import type { Testimonial } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

const Testimonial = ({ data }: { data: Testimonial }) => {

  const { enable, title, button, testimonials } = data.frontmatter;
  const isDivisibleByTwo = testimonials.length > 6;
  const sliderScrollSpeed = 69;
  const sliderPauseOnHover = "true";

  useEffect(() => {
    initInfiniteSliders();
  }, []);


  return (
    <>
      {
        enable && (
          <section className="section">
            <div className="container bg-text-dark rounded-3xl py-24 xl:py-32 overflow-hidden testimonial-bg">
              <div className="section-container ">
                <div className="section-intro text-center ">
                  {title && (
                    <h1
                      className="title heading-outline"
                      data-aos="fade-up-sm"
                      data-aos-delay="0"
                      dangerouslySetInnerHTML={markdownify(title)}
                    />
                  )}
                </div>
                <div className="section-content">
                  <div>
                    {isDivisibleByTwo ? (
                      testimonials.length && (
                        <div
                          className="grid gap-3"
                          data-aos="fade-up-sm"
                          data-aos-delay="100"
                        >
                          <div
                            className="inf-slider"
                            data-inf-scroll-speed={sliderScrollSpeed}
                            data-inf-direction="normal"
                            data-inf-slide-pause-on-hover={sliderPauseOnHover}
                          >
                            <div className="inf-slide-track">
                              {testimonials
                                .slice(0, Math.ceil(testimonials.length / 2))
                                .map((testimonial, i) => (
                                  <div className="inf-slide ml-3" key={i}>
                                    <div className="border border-border/10 bg-body/5 backdrop-blur-xs rounded-2xl p-6 max-w-[360px] w-full h-full flex flex-col justify-between">
                                      <StarRatings rating={testimonial.rating} />
                                      <blockquote
                                        className="text-white text-lg font-medium mt-7 mb-4"
                                        dangerouslySetInnerHTML={markdownify(testimonial.content)}
                                      />
                                      <span className="inline-block text-text-light/60 font-medium" dangerouslySetInnerHTML={markdownify(testimonial.name)} />
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div
                            className="inf-slider"
                            data-inf-scroll-speed={sliderScrollSpeed}
                            data-inf-direction="reverse"
                            data-inf-slide-pause-on-hover={sliderPauseOnHover}
                          >
                            <div className="inf-slide-track">
                              {testimonials.map((testimonial, i) => (
                                <div className="inf-slide ml-3" key={i}>
                                  <div className="border border-border/10 bg-body/5 backdrop-blur-xs rounded-2xl p-6 max-w-[360px] w-full h-full flex flex-col justify-between">
                                    <StarRatings rating={testimonial.rating} />
                                    <blockquote
                                      className="text-white text-lg font-medium mt-7 mb-4"
                                      dangerouslySetInnerHTML={markdownify(testimonial.content)}
                                    />
                                    <span className="inline-block text-text-light/60 font-medium" dangerouslySetInnerHTML={markdownify(testimonial.name)} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div
                        className="inf-slider"
                        data-inf-scroll-speed={sliderScrollSpeed}
                        data-inf-direction="reverse"
                        data-inf-slide-pause-on-hover={sliderPauseOnHover}
                      >
                        <div className="inf-slide-track">
                          {testimonials.map((testimonial, i) => (
                            <div className="inf-slide ml-3" key={i}>
                              <div className="border border-border/10 bg-body/5 backdrop-blur-xs rounded-2xl p-6 max-w-[360px] w-full h-full flex flex-col justify-between">
                                <StarRatings rating={testimonial.rating} />
                                <blockquote
                                  className="text-white text-lg font-medium mt-7 mb-4"
                                  dangerouslySetInnerHTML={markdownify(testimonial.content)}
                                />
                                <span className="inline-block text-text-light/60 font-medium" dangerouslySetInnerHTML={markdownify(testimonial.name)} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {button.enable && (
                    <div
                      className="flex justify-center"
                      data-aos="fade-up-sm"
                      data-aos-delay="150"
                    >
                      <Link href={button.link} className="btn btn-outline-secondary mt-16">
                        {button.label}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      }
    </>
  );
};

export default Testimonial;
