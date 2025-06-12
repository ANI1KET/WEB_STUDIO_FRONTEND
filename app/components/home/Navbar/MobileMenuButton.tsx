"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/app/components/ui/button";

interface MobileMenuButtonProps {
  isOpen?: boolean;
  scrolled?: boolean;
  onClick: () => void;
}

const MobileMenuButton = ({
  onClick,
  isOpen = false,
  scrolled = false,
}: MobileMenuButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Toggle mobile menu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${
        scrolled
          ? "text-gray-700 hover:bg-gray-100"
          : "text-white hover:bg-green-700/30"
      } md:hidden transition-all duration-300 relative z-50 rounded-lg p-2 h-10 w-10 sm:h-12 sm:w-12 min-w-[40px] min-h-[40px]`}
    >
      <div className="relative">
        {isOpen ? (
          <X
            size={24}
            className={`transition-all duration-300 ${
              isHovered ? "scale-110 rotate-90" : "scale-100 rotate-0"
            }`}
            aria-hidden="true"
          />
        ) : (
          <Menu
            size={24}
            className={`transition-all duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            aria-hidden="true"
          />
        )}

        <span
          className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 ${
            scrolled ? "bg-green-600" : "bg-green-300"
          } transition-all duration-300 ${
            isHovered ? "w-6 opacity-100" : "w-0 opacity-0"
          } rounded-full`}
        ></span>
      </div>
    </Button>
  );
};

export default MobileMenuButton;
