"use client";

import { useRouter } from "next/navigation";
import { Permission } from "@prisma/client";
import { ChevronDown, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { listingItems } from "@/app/common/config/listingOptions";

import { Button } from "@/app/components/ui/button";

interface ListingsDropdownProps {
  scrolled: boolean;
  isAuthenticated: boolean;
}

const ListingsDropdown = ({
  scrolled,
  isAuthenticated,
}: ListingsDropdownProps) => {
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleListingClick = (category: Permission) => {
    navigate.push(
      `https://list.${process.env.NEXT_PUBLIC_BASE_DOMAIN}/${category}`
    );

    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        title="Login to proceed"
        onClick={() => navigate.push("/auth/login")}
        className={`${
          scrolled
            ? "text-gray-700 hover:text-green-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50"
            : "text-white hover:text-green-300 hover:bg-gradient-to-r hover:from-green-800/40 hover:to-emerald-700/40"
        } transition-all duration-300 flex items-center gap-1 px-3 lg:px-4 py-2 rounded-lg group relative font-medium text-sm lg:text-base shadow-sm hover:shadow-md`}
      >
        <Plus size={16} className="opacity-70" />
        List Item
        <span
          className={`absolute bottom-0 left-0 h-0.5 ${
            scrolled
              ? "bg-gradient-to-r from-green-600 to-emerald-600"
              : "bg-gradient-to-r from-green-300 to-emerald-300"
          } transition-all duration-300 group-hover:w-full w-0 rounded-full`}
        ></span>
      </Button>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        variant="ghost"
        onClick={toggleDropdown}
        className={`${
          scrolled
            ? "text-gray-700 hover:text-green-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50"
            : "text-white hover:text-green-300 hover:bg-gradient-to-r hover:from-green-800/40 hover:to-emerald-700/40"
        } transition-all duration-300 flex items-center gap-1 px-3 lg:px-4 py-2 rounded-lg group relative font-medium text-sm lg:text-base shadow-sm hover:shadow-md`}
      >
        <Plus size={16} className="opacity-70" />
        List Item
        <ChevronDown
          size={16}
          className={`opacity-70 ml-1 transition-all duration-300 ${
            isOpen ? "rotate-180 opacity-100" : "rotate-0"
          }`}
        />
        <span
          className={`absolute bottom-0 left-0 h-0.5 ${
            scrolled
              ? "bg-gradient-to-r from-green-600 to-emerald-600"
              : "bg-gradient-to-r from-green-300 to-emerald-300"
          } transition-all duration-300 group-hover:w-full w-0 rounded-full`}
        ></span>
      </Button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full transition-all duration-200 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-gray-200/50 shadow-2xl rounded-xl overflow-hidden backdrop-blur-xl w-72 mt-1">
          {listingItems.map((item) => {
            return (
              <div
                key={item.key}
                className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 focus:bg-gradient-to-r focus:from-green-50 focus:to-emerald-50 transition-all duration-200 cursor-pointer p-3 text-gray-700 hover:text-green-700 group border-b border-gray-100 last:border-b-0"
                onClick={() => handleListingClick(item.key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"></span>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListingsDropdown;
