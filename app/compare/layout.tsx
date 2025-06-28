"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building, Car, Scale } from "lucide-react";

interface CompareLayoutProps {
  children: React.ReactNode;
}

const CompareLayout = ({ children }: CompareLayoutProps) => {
  const pathname = usePathname();

  const navItems = [
    { path: "/compare", label: "Overview", icon: Scale },
    { path: "/compare/rooms", label: "Rooms", icon: Home },
    { path: "/compare/properties", label: "Properties", icon: Building },
    { path: "/compare/vehicles", label: "Vehicles", icon: Car },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Compare Listings
            </h1>
            <p className="text-gray-600 mt-2">
              Compare your selected listings side by side
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`flex items-center gap-2 whitespace-nowrap text-blue-600 text-lg py-1 px-4 rounded-sm ${
                      isActive ? "bg-green-200" : "hover:text-green-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default CompareLayout;
