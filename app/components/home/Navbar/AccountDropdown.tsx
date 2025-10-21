"use client";

import {
  User,
  Heart,
  Settings,
  GitCompare,
  CircleUserRound,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  canAccessDashboard,
  canAccessInterested,
} from "../../../common/config/authorization";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarImage } from "@/app/components/ui/avatar";

interface AccountDropdownProps {
  scrolled?: boolean;
}

const AccountDropdown = ({ scrolled = false }: AccountDropdownProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => handleOpenChange(!isOpen)}
          className={`rounded-full overflow-hidden transition-all duration-300 
            ${
              scrolled
                ? "ring-2 ring-gradient-to-r hover:ring-green-500 "
                : "ring-2 ring-gradient-to-r hover:ring-green-400 "
            }
          group shadow-lg `}
        >
          <Avatar className="">
            {session?.user.image ? (
              <AvatarImage src={session.user.image} alt="User profile" />
            ) : (
              <AvatarImage
                className={`${
                  scrolled
                    ? "bg-gradient-to-br from-green-600 to-teal-500"
                    : "bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800"
                } text-white flex items-center justify-center transition-all duration-300 group-hover:scale-125 shadow-inner`}
              >
                <User aria-hidden="true" />
              </AvatarImage>
            )}
          </Avatar>
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={2}
        className="w-64 bg-white/98 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-xl animate-fade-in"
      >
        <div className="px-3 py-2 border-b border-gradient-to-r mb-1 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-800">Welcome back!</p>
          <p className="text-xs text-gray-500">
            Manage your account and preferences
          </p>
        </div>

        {session ? (
          <div>
            <DropdownMenuItem
              onClick={() => signOut({ redirect: false })}
              className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-200 shadow-sm">
                <User size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-800">Logout</span>
                <p className="text-xs text-gray-500">Have a good day</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/account")}
              className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-amber-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg group-hover:from-amber-200 group-hover:to-amber-300 transition-all duration-200 shadow-sm">
                <CircleUserRound size={16} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-800">Account</span>
                <p className="text-xs text-gray-500">Manage your account</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {canAccessDashboard(session.user.role) && (
              <DropdownMenuItem
                onClick={() =>
                  window.open(
                    `https://dashboard.${
                      process.env.NEXT_PUBLIC_BASE_DOMAIN
                    }/${session.user.role?.toLowerCase()}`,
                    "_blank"
                  )
                }
                className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-200 shadow-sm">
                  <LayoutDashboard size={16} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-800">Dashboard</span>
                  <p className="text-xs text-gray-500">View your overview</p>
                </div>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() =>
                window.open(
                  `https://shared.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`,
                  "_blank"
                )
              }
              className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200 shadow-sm">
                <Settings size={16} className="text-red-600" />
              </div>

              <div className="flex-1">
                <span className="font-medium text-gray-800">
                  Shared Listings
                </span>

                <p className="text-xs text-gray-500">Manage shared listings</p>
              </div>
            </DropdownMenuItem>

            {canAccessInterested(session.user.role) && (
              <DropdownMenuItem
                onClick={() => router.push("/interested")}
                className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200 shadow-sm">
                  <Heart size={16} className="text-red-600" />
                </div>

                <div className="flex-1">
                  <span className="font-medium text-gray-800">
                    Interested Listings
                  </span>

                  <p className="text-xs text-gray-500">Your favorites</p>
                </div>
              </DropdownMenuItem>
            )}

            {/* {canPromote(session.user.role) && (
              <DropdownMenuItem
                onClick={() =>
                  window.open(
                    `https://promote.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`,
                    "_blank"
                  )
                }
                className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-200 shadow-sm">
                  <Rocket size={16} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-800">
                    Promote Listings
                  </span>
                  <p className="text-xs text-gray-500">Boost visibility</p>
                </div>
              </DropdownMenuItem>
            )} */}
          </div>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => router.push("/auth/login")}
              className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-200 shadow-sm">
                <User size={16} className="text-blue-600" />
              </div>

              <div className="flex-1">
                <span className="font-medium text-gray-800">Login</span>
                <p className="text-xs text-gray-500">Access your account</p>
              </div>
            </DropdownMenuItem>

            {/* <DropdownMenuItem
              onClick={() => router.push("/auth/login")}
              className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200 shadow-sm">
                <Heart size={16} className="text-red-600" />
              </div>

              <div className="flex-1">
                <span className="font-medium text-gray-800">
                  Shared Listings
                </span>
                <p className="text-xs text-gray-500">Manage shared listings</p>
              </div>
            </DropdownMenuItem> */}

            <DropdownMenuItem
              onClick={() => router.push("/auth/login")}
              className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200 shadow-sm">
                <Heart size={16} className="text-red-600" />
              </div>

              <div className="flex-1">
                <span className="font-medium text-gray-800">
                  Interested Listings
                </span>
                <p className="text-xs text-gray-500">Your favorites</p>
              </div>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem
          onClick={() => router.push("/compare")}
          className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50 rounded-lg transition-all duration-200 my-1 px-3 py-2.5 group cursor-pointer"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-200 shadow-sm">
            <GitCompare size={16} className="text-orange-600" />
          </div>
          <div className="flex-1">
            <span className="font-medium text-gray-800">Compare Listings</span>
            <p className="text-xs text-gray-500">Compare saved listings</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
