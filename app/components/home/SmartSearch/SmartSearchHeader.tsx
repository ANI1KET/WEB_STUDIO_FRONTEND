"use client";

import React from "react";
import { Search } from "lucide-react";

const SmartSearchHeader: React.FC = () => {
  return (
    <div className="flex items-center mb-1">
      <div className="p-2 rounded-full bg-green-100 text-green-600 mr-2">
        <Search className="h-5 w-5" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">Smart Search</h2>
    </div>
  );
};

export default SmartSearchHeader;
