"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/app/components/ui/button";

interface SubFeature {
  name: string;
  description: string;
  routingPath: string;
}

interface DropdownItem {
  name: string;
  description: string;
  subFeatures: SubFeature[];
}

interface MobileEnhancedNavDropdownProps {
  label: string;
  items: DropdownItem[];
}

const MobileEnhancedNavDropdown = ({
  label,
  items,
}: MobileEnhancedNavDropdownProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<DropdownItem | null>(
    null
  );

  const toggleOpen = () => {
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

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        onClick={toggleOpen}
        className="w-full justify-between bg-white/80 hover:bg-white/90 border border-green-200 hover:border-green-300 rounded-xl p-3 h-auto transition-all duration-200 group text-sm sm:text-base shadow-sm hover:shadow-md"
      >
        <span className="font-medium text-gray-800 group-hover:text-green-700 text-left">
          {label}
        </span>

        <ChevronDown
          size={16}
          className={`text-green-600 transition-all duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          } group-hover:text-green-700`}
        />
      </Button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2 bg-white/90 border border-green-200 shadow-lg rounded-xl overflow-hidden backdrop-blur-sm">
          {!selectedCategory ? (
            <div className="grid gap-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick({ itemName: item.name })}
                  className="group cursor-pointer rounded-lg p-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 border border-transparent hover:border-green-200"
                >
                  <div className="flex items-center gap-1 space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>

                    <div>
                      <h4 className="font-semibold text-xs text-gray-800 group-hover:text-green-700 line-clamp-2">
                        {item.name}
                      </h4>

                      <p className="text-[10px] text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {item.subFeatures && item.subFeatures.length > 0 && (
                      <ChevronRight
                        size={16}
                        className="text-green-600 group-hover:text-green-700"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToMain}
                  className="text-xs text-gray-600 hover:text-green-700 transition-colors flex items-center gap-1 mb-3 font-medium"
                >
                  <ChevronDown size={14} className="rotate-90" />
                  Back to {label}
                </button>

                <div className="font-medium text-xs text-gray-800">
                  {selectedCategory.name}
                </div>
              </div>

              <div className="space-y-2">
                {selectedCategory.subFeatures.map((subFeature, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() =>
                      handleItemClick({
                        itemName: selectedCategory.name,
                        subFeatureName: subFeature.name,
                      })
                    }
                    className="group cursor-pointer rounded-lg p-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 border border-transparent hover:border-green-200"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-1.5"></div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs text-gray-800 group-hover:text-green-700">
                          {subFeature.name}
                        </p>

                        <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-2">
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

export default MobileEnhancedNavDropdown;
