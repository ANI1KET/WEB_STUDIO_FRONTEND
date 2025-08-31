import React from "react";
import { Heart } from "lucide-react";

import NavBar from "./navbar";

export default function InterestedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                My Interested Listings
              </h1>
            </div>

            <p className="text-gray-600 mt-2">
              Manage your interested listings and preferences
            </p>
          </div>
        </div>
      </div>

      <NavBar />

      {children}
    </div>
  );
}
