import React from "react";
import Link from "next/link";
import {
  User,
  Building2,
  // TrendingUp,
  // CreditCard,
} from "lucide-react";

import { cn } from "@/app/lib/utils";

const AccountNavigation = ({ path }: { path: string }) => {
  const navItems = [
    {
      icon: User,
      path: "/account",
      label: "Profile",
    },
    // {
    //   icon: TrendingUp,
    //   label: "Promotion Settings",
    //   path: "/account/listing-promotions",
    // },
    // {
    //   icon: CreditCard,
    //   label: "Bank Details",
    //   path: "/account/bank-details",
    // },
    {
      icon: Building2,
      label: "Listing Service",
      path: "/account/listing-services",
    },
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-green-100 p-4 mb-8">
      <nav className="flex flex-wrap gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = path === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              )}
            >
              <Icon className="w-4 h-4" />

              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AccountNavigation;
