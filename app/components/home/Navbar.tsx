"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { useIsMobile } from "@/app/common/hooks/use-mobile";
import { rentalItems, listingItems } from "@/app/common/config/navBar";

import EnhancedNavbarDropdown from "./Navbar/EnhancedNavbarDropdown";

const MobileMenu = dynamic(() => import("./Navbar/MobileMenu"));
const AccountDropdown = dynamic(() => import("./Navbar/AccountDropdown"));
const MobileMenuButton = dynamic(() => import("./Navbar/MobileMenuButton"));
const ListingsDropdown = dynamic(() => import("./Navbar/ListingsDropdown"));

const Navbar = ({ session }: { session: Session | null }) => {
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const updateVisibility = useCallback(
    (current: number) => {
      const previous = scrollYProgress.getPrevious() ?? 0;
      const direction = current - previous;
      const threshold = window.innerHeight * 0.05;

      setVisible(window.scrollY < threshold || direction < 0);
      setScrolled(window.scrollY > 20);
    },
    [scrollYProgress]
  );

  useMotionValueEvent(scrollYProgress, "change", updateVisibility);

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, mobileMenuOpen]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-xl border-b border-green-100"
          : "bg-emerald-400 backdrop-blur-md shadow-2xl"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href={"/"} className="flex-shrink-0 flex items-center group">
            <h1 className="text-xl lg:text-2xl font-bold flex items-center cursor-pointer transition-all duration-300 hover:scale-105">
              <span
                className={
                  "bg-green-600 bg-clip-text text-transparent transition-all duration-300 drop-shadow-sm"
                }
              >
                Afno
              </span>

              <span
                className={
                  "bg-black bg-clip-text text-transparent transition-all duration-300 drop-shadow-sm"
                }
              >
                Sansaar
              </span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <EnhancedNavbarDropdown
              label="Rentals"
              items={rentalItems}
              scrolled={scrolled}
            />

            {/* <EnhancedNavbarDropdown
              label="Buy & Sell"
              items={}
              scrolled={scrolled}
            /> */}

            <EnhancedNavbarDropdown
              scrolled={scrolled}
              items={listingItems}
              label="Listing Services"
            />
          </div>

          <div className="hidden md:flex items-center ">
            <ListingsDropdown scrolled={scrolled} isAuthenticated={!!session} />

            <AccountDropdown scrolled={scrolled} />
          </div>

          <div className="md:hidden flex items-center">
            <ListingsDropdown scrolled={scrolled} isAuthenticated={!!session} />

            <MobileMenuButton
              scrolled={scrolled}
              isOpen={mobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </motion.nav>
  );
};

export default Navbar;
