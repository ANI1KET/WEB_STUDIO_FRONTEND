"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building, Car, Heart } from "lucide-react";

const navItems = [
  { path: "/interested", label: "Overview", icon: Heart },
  { path: "/interested/rooms", label: "Rooms", icon: Home },
  { path: "/interested/properties", label: "Properties", icon: Building },
  { path: "/interested/vehicles", label: "Vehicles", icon: Car },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap
                  ${
                    isActive
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-green-100"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
