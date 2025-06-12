"use client";

import { Permission } from "@prisma/client";
import { Search, Home, Building, Car } from "lucide-react";

// Category Search Icon
export const getCategorySearchIcon = (category: Permission) => {
  switch (category) {
    case "room":
      return <Home className="h-5 w-5 mr-2" />;
    case "property":
      return <Building className="h-5 w-5 mr-2" />;
    case "vehicle":
      return <Car className="h-5 w-5 mr-2" />;
    default:
      return <Search className="h-5 w-5 mr-2" />;
  }
};
