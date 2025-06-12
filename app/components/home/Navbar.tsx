"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useIsMobile } from "@/app/hooks/use-mobile";
// import { propertyItems, roomItems, vehicleItems } from "./config/Navbar";

import MobileMenu from "./Navbar/MobileMenu";
import NavbarDropdown from "./Navbar/NavbarDropdown";
import ProfileDropdown from "./Navbar/ProfileDropdown";
import MobileMenuButton from "./Navbar/MobileMenuButton";
import ListingsDropdown from "./Navbar/ListingsDropdown";

const Navbar = () => {
  const { data } = useSession();

  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Set visible state based on scroll direction with smoother threshold
      setVisible(
        (prevScrollPos > currentScrollPos &&
          prevScrollPos - currentScrollPos > 5) ||
          currentScrollPos < 10
      );

      // Set scrolled state for background change
      setScrolled(currentScrollPos > 20);

      // Update previous scroll position with a small delay for smoother transitions
      setTimeout(() => {
        setPrevScrollPos(currentScrollPos);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    // Handle resize events to close mobile menu
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-xl border-b border-green-100"
          : "bg-emerald-400 backdrop-blur-md shadow-2xl"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Enhanced with gradient */}
          <div className="flex-shrink-0 flex items-center group">
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
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavbarDropdown
              // items={roomItems}
              route={"/explore/rooms"}
              scrolled={scrolled}
              label="Explore Rooms"
            />

            <NavbarDropdown
              scrolled={scrolled}
              route={"/explore/properties"}
              // items={propertyItems}
              label="Explore Properties"
            />

            <NavbarDropdown
              route={"/explore/vehicles"}
              scrolled={scrolled}
              // items={vehicleItems}
              label="Explore Vehicles"
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center ">
            <ListingsDropdown
              scrolled={scrolled}
              isAuthenticated={!!data}
              userSubscriptions={data?.user.permission}
            />

            <ProfileDropdown scrolled={scrolled} />
          </div>

          {/* Mobile menu button - Enhanced for small screens */}
          <div className="md:hidden flex items-center">
            <MobileMenuButton
              scrolled={scrolled}
              isOpen={mobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu - Enhanced responsiveness */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </nav>
  );
};

export default Navbar;
