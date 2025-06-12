"use client";

import { Permission } from "@prisma/client";

// Category Icon
export const getCategoryIcon = (categoryValue: Permission) => {
  switch (categoryValue) {
    case "room":
      return <span className="text-green-500">🏠</span>;
    case "property":
      return <span className="text-green-500">🏢</span>;
    case "vehicle":
      return <span className="text-green-500">🚗</span>;
    default:
      return null;
  }
};
