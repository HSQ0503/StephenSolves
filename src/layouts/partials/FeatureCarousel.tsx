"use client";

import DynamicIcon from "@/helpers/DynamicIcon";
import SineCosineGraph from "@/components/SineCosineGraph";
import { markdownify } from "@/lib/utils/textConverter";
import type { FeatureCarousel } from "@/types";
import { useState } from "react";

const FeatureCarousel = ({ data }: { data: FeatureCarousel }) => {
  const { title, subtitle, list, enable } = data.frontmatter;
  const [activeIndex, setActiveIndex] = useState(0);

  if (!enable || !list.length) return null;

  const handleFeatureItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-container">
          <div className="section-intro text-center">
            {title && (
              <h1
                className="title heading-outline"
                data-aos="fade-up-sm"
                data-aos-delay="0"
                dangerouslySetInnerHTML={markdownify(title)}
              />
            )}
            {subtitle && (
              <p
                className="subtitle"
                data-aos="fade-up-sm"
                data-aos-delay="50"
                dangerouslySetInnerHTML={markdownify(subtitle)}
              />
            )}
          </div>
          <div className="section-content">
            <div
              className="rounded-2xl border border-border overflow-hidden flex flex-col lg:flex-row"
              data-aos="fade-up-sm"
              data-aos-delay="150"
            >
              <div className="lg:w-[45%] xl:w-[30%] flex flex-col bg-white">
                {list.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleFeatureItemClick(index)}
                    className={`feature-pagination-item lg:first:rounded-ss-2xl lg:last:rounded-bl-2xl bg-white border-b border-gray-200 last:border-b-0 p-6 flex items-start gap-5 cursor-pointer border-r transition-colors duration-300 border-l-2 border-l-transparent ${activeIndex === index ? "active" : ""
                      }`}
                    data-index={index}
                  >
                    <div className="size-6">
                      <DynamicIcon
                        icon={item.icon}
                        width={26}
                        height={26}
                        className="text-[#7bafd4] feature-pagination-icon text-3xl -mt-1"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-h6 text-[#161525] leading-snug font-semibold">
                        {item.title}
                      </p>
                      <p className="text-[#5f5f69]">{item.subtitle}</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgb(22, 21, 37)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-6 ml-auto"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="lg:w-[55%] xl:w-[70%] flex items-center justify-center p-6 lg:p-10">
                <SineCosineGraph activeGraph={activeIndex} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCarousel;
