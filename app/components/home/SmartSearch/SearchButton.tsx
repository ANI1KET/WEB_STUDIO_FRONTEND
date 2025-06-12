"use client";

import React from "react";
import { Permission } from "@prisma/client";

import { getCategorySearchIcon } from "./config/SearchButtonIcon";

import { Button } from "@/app/components/ui/button";
import { useIsMobile } from "@/app/hooks/use-mobile";

interface SearchButtonProps {
  onClick: () => void;
  category: Permission | "";
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, category }) => {
  const isMobile = useIsMobile();

  return (
    <div className="mt-2 flex justify-center">
      <Button
        onClick={onClick}
        className={`bg-green-300 hover:bg-green-200 text-white ${
          isMobile ? "w-full" : "min-w-[200px]"
        } py-6 text-lg rounded-full font-medium shadow-lg hover:shadow-xl transition-all`}
      >
        {getCategorySearchIcon(category as Permission)} Search Now
      </Button>
    </div>
  );
};

export default SearchButton;
