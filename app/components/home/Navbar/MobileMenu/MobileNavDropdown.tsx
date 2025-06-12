"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";
// import { ChevronDown, Dot } from "lucide-react";

import { Button } from "@/app/components/ui/button";

interface MobileNavDropdownProps {
  label: string;
  route: string;
  // items: string[];
}

const MobileNavDropdown = ({
  label,
  route,
}: //  items
MobileNavDropdownProps) => {
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleOpen = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        onClick={() => router.push(route)}
        // onClick={toggleOpen}
        className="w-full justify-between bg-white/80 hover:bg-white/90 border border-green-200 hover:border-green-300 rounded-xl p-3 sm:p-4 h-auto transition-all duration-200 group text-sm sm:text-base shadow-sm hover:shadow-md"
      >
        <span className="font-medium text-gray-800 group-hover:text-green-700 text-left">
          {label}
        </span>
        {/* <ChevronDown
          size={16}
          className={`text-green-600 transition-all duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          } group-hover:text-green-700`}
        /> */}
      </Button>

      {/* Dropdown content */}
      {/* <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2 bg-white/90 border border-green-200 shadow-lg rounded-xl overflow-hidden backdrop-blur-sm">
          {items.map((item, index) => (
            <div
              key={index}
              className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 focus:bg-gradient-to-r focus:from-green-50 focus:to-emerald-50 transition-all duration-200 px-3 py-2 sm:py-2.5 group cursor-pointer border-b border-green-100 last:border-b-0"
              onClick={() => {
                console.log(`Selected: ${item}`);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center">
                <Dot
                  size={18}
                  className="text-green-500 mr-2 group-hover:scale-125 transition-transform duration-200"
                />
                <span className="font-medium text-gray-700 group-hover:text-green-700 text-sm sm:text-base">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default MobileNavDropdown;
