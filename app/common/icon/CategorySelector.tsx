"use client";

export const getCategoryIcon = (categoryValue: string) => {
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
