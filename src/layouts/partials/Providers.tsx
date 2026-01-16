"use client";

import config from "@/config/config.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { settings } = config;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Initialize AOS (Animate On Scroll) library
  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 100,
      once: true,
    });

    // Refresh AOS on scroll for smoother animations
    let scrollRef = 0;
    const handleScroll = () => {
      scrollRef <= 10 ? scrollRef++ : AOS.refresh();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sticky header implementation
  useEffect(() => {
    const sticky_header = settings.sticky_header;
    if (!sticky_header) return;

    let lastScroll = 0;

    const onScroll = () => {
      const header = document.querySelector(".header");
      if (!header) return;

      const currentScroll = window.scrollY;
      if (currentScroll > 300 && currentScroll > lastScroll) {
        header.classList.add("header-reveal");
      } else if (currentScroll < 250) {
        header.classList.remove("header-reveal");
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Initialize on first load

    return () => window.removeEventListener("scroll", onScroll);
  }, [settings.sticky_header]);

  return <>{children}</>;
}
