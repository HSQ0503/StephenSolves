"use client";

import Logo from "@/components/Logo";
import RightArrowBtn from "@/components/RightArrowBtn";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { NavigationLink } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import NotificationBar from "./NotificationBar";

const Header = () => {
  const { main }: { main: NavigationLink[] } = menu;
  const { navigation_button, notification_bar } = config;
  const pathname = usePathname();
  const navDropdownRef = useRef<HTMLSpanElement>(null);
  const navDropdownListRef = useRef<HTMLUListElement>(null);

  // Handle dropdown menus
  useEffect(() => {
    const navDropdown = navDropdownRef.current;
    const navDropdownList = navDropdownListRef.current;

    if (!navDropdown || !navDropdownList) return;

    navDropdown.addEventListener("click", () => {
      navDropdownList.classList.toggle("block");
    });

    return () => {
      navDropdown.removeEventListener("click", () => {
        navDropdownList.classList.toggle("block");
      });
    };
  }, []);

  return (
    <div className={`absolute inset-x-0 z-30 `}>
      {notification_bar.enable && <NotificationBar />}

      <header className={`header w-full`}>
        <nav className="navbar container">
          <div className="order-0">
            {/* logo */}
            <div className="order-0 flex items-center">
              <Logo />
            </div>
          </div>
          <input id="nav-toggle" type="checkbox" className="hidden" />
          <label
            htmlFor="nav-toggle"
            className="order-3 cursor-pointer flex items-center lg:hidden text-text-dark lg:order-1 ml-4"
          >
            <svg
              id="show-button"
              className="h-6 fill-current block"
              viewBox="0 0 20 20"
            >
              <title>Menu Open</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
            </svg>
            <svg
              id="hide-button"
              className="h-6 fill-current hidden"
              viewBox="0 0 20 20"
            >
              <title>Menu Close</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          </label>
          <ul
            id="nav-menu"
            className="navbar-nav order-3 hidden w-full lg:order-1 lg:flex lg:w-auto lg:gap-x-2 xl:gap-x-8"
          >
            {main.map((menu, i) => (
              <React.Fragment key={i}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative ">
                    <span
                      ref={navDropdownRef}
                      id="nav-dropdown-id"
                      className={`nav-link !bg-transparent inline-flex items-center cursor-pointer ${menu.children?.map(({ url }) => url)?.includes(pathname) ||
                        menu.children
                          ?.map(({ url }) => `${url}/`)
                          ?.includes(pathname)
                        ? ""
                        : ""
                        }`}
                    >
                      {menu.name}
                      <svg
                        className="h-5 w-5 fill-current ml-1 group-hover:lg:rotate-180 transition-transform duration-300"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul
                      ref={navDropdownListRef}
                      className="nav-dropdown-list"
                      id="nav-dropdown-list-id"
                    >
                      {menu.children?.map((child, i: number) => (
                        <li key={i} className="nav-dropdown-item">
                          <Link
                            href={child.url}
                            aria-label={child.name}
                            className={`nav-dropdown-link block ${(pathname === `${child.url}/` ||
                              pathname === child.url) &&
                              "active"
                              }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      className={`nav-link block ${(
                        pathname === `${menu.url}/` || pathname === menu.url
                      ) && "active"}`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            {navigation_button.enable && (
              <li className="inline-block md:hidden nav-link">
                <RightArrowBtn
                  aria-label={navigation_button.label}
                  link={navigation_button.link}
                  label={navigation_button.label}
                  className="btn btn-primary"
                />
              </li>
            )}
          </ul>
          <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
            {navigation_button.enable && (
              <RightArrowBtn
                aria-label={navigation_button.label}
                link={navigation_button.link}
                label={navigation_button.label}
                className="btn btn-primary hidden md:flex"
              />
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
