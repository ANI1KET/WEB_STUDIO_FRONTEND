"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building, Car, Heart } from "lucide-react";

import { Button } from "@/app/components/ui/button";

interface InterestedLayoutProps {
  children: React.ReactNode;
}

const InterestedLayout = ({ children }: InterestedLayoutProps) => {
  const pathname = usePathname();

  const navItems = [
    { path: "/interested", label: "Overview", icon: Heart },
    { path: "/interested/rooms", label: "Rooms", icon: Home },
    { path: "/interested/vehicles", label: "Vehicles", icon: Car },
    { path: "/interested/properties", label: "Properties", icon: Building },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              My Interested Items
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your saved listings and favorites
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? "hover:bg-green-200 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default InterestedLayout;
