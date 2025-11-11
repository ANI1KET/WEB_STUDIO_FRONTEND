"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

interface SubFeature {
  name: string;
  routingPath: string;
  description: string;
}

interface DropdownItem {
  name: string;
  description: string;
  subFeatures: SubFeature[];
}

interface EnhancedNavbarDropdownProps {
  label: string;
  scrolled?: boolean;
  items: DropdownItem[];
}

const EnhancedNavbarDropdown = ({
  label,
  items,
  scrolled = false,
}: EnhancedNavbarDropdownProps) => {
  const router = useRouter();
  const isExceeds = items.length > 3;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<DropdownItem | null>(
    null
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedCategory(null);
    }
  };

  const handleItemClick = ({
    itemName,
    routingPath,
    subFeatureName,
  }: {
    itemName: string;
    routingPath?: string;
    subFeatureName?: string;
  }) => {
    if (subFeatureName) {
      setIsOpen(false);
      setSelectedCategory(null);
      router.push(routingPath ?? "/");
    } else {
      const item = items.find((i) => i.name === itemName);
      if (item && item.subFeatures.length > 0) {
        setSelectedCategory(item);
      } else {
        setIsOpen(false);
        setSelectedCategory(null);
      }
    }
  };

  const handleBackToMain = () => {
    setSelectedCategory(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
        {label}
        <ChevronDown
          size={16}
          className={`transition-all duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
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
        className={cn(
          "absolute left-1/2 top-full mt-2 -translate-x-1/2 transition-all duration-200 ease-out",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="bg-popover p-4 shadow-lg rounded-lg overflow-hidden max-w-[90vw]">
          {!selectedCategory ? (
            <div
              className={cn("space-y-2", isExceeds ? "w-[500px]" : "w-[350px]")}
            >
              <h5 className="text-sm font-medium mb-3">{label}</h5>

              <div
                className={cn(
                  "space-y-2",
                  isExceeds
                    ? "grid grid-cols-2 gap-2 space-y-0"
                    : "flex flex-col"
                )}
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleItemClick({ itemName: item.name })}
                    className="group cursor-pointer rounded-md p-2 hover:bg-accent transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>

                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>

                        <p className="text-xs mt-1">{item.description}</p>
                      </div>

                      {item.subFeatures.length > 0 && (
                        <ChevronDown
                          size={cn(isExceeds ? "24" : "16")}
                          className="ml-auto group-hover:text-primary transition-colors -rotate-90"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2 w-[350px]">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={handleBackToMain}
                  className="text-xs transition-colors flex items-center gap-1"
                >
                  <ChevronDown size={12} className="rotate-90" />
                  Back
                </button>

                <div className="text-sm font-medium">
                  {selectedCategory.name}
                </div>
              </div>

              <div className="space-y-1">
                {selectedCategory.subFeatures.map((subFeature, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() =>
                      handleItemClick({
                        itemName: selectedCategory.name,
                        subFeatureName: subFeature.name,
                        routingPath: subFeature.routingPath,
                      })
                    }
                    className="group cursor-pointer rounded-md p-2 hover:bg-accent transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>

                      <div>
                        <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                          {subFeature.name}
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                          {subFeature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedNavbarDropdown;
