"use client";

import React from "react";
import { List } from "lucide-react";

const ListingServiceCardHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
        <List className="w-4 h-4 text-white" />
      </div>
      <h2 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
        Listing Services
      </h2>
    </div>
  );
};

export default ListingServiceCardHeader;
