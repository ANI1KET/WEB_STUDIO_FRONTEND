"use client";

import {
  X,
  User,
  Heart,
  Settings,
  GitCompare,
  CircleUserRound,
  LayoutDashboard,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  // canPromote,
  canAccessDashboard,
  canAccessInterested,
} from "../../../common/config/authorization";
// import { roomItems, propertyItems, vehicleItems } from "./config/MobileMenu";

import { Button } from "@/app/components/ui/button";
import MobileNavItem from "./MobileMenu/MobileNavItem";
import MobileNavDropdown from "./MobileMenu/MobileNavDropdown";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{ minHeight: "100dvh" }}
        className={`fixed top-0 right-0 h-full w-full max-w-xs sm:max-w-sm bg-white shadow-2xl z-[110] md:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-50 bg-emerald-400 px-4 py-4 flex items-center justify-between shadow-lg">
          <h2 className="text-xl font-semibold drop-shadow-sm">Menu</h2>

          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="text-white hover:text-green-100 hover:bg-white/20 rounded-full h-10 w-10 transition-all duration-200"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="px-4 py-6 space-y-4 min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-50 to-white">
          <div className="space-y-3">
            <MobileNavDropdown
              label="Explore Rooms"
              route={"/explore/rooms"}
              //  items={roomItems}
            />
            <MobileNavDropdown
              label="Explore Properties"
              route={"/explore/properties"}
              // items={propertyItems}
            />
            <MobileNavDropdown
              label="Explore Vehicles"
              route={"/explore/vehicles"}
              // items={vehicleItems}
            />
          </div>

          <hr className="my-6 border-green-200" />

          <div className="space-y-3">
            <div className="px-2 py-2">
              <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                Account
              </h3>
            </div>

            {session ? (
              <>
                <MobileNavItem
                  label="Logout"
                  description="Have a good day"
                  onClick={() => signOut({ redirect: false })}
                  icon={<User size={18} className="text-blue-600" />}
                />

                <MobileNavItem
                  label="Account"
                  description="Manage your account"
                  onClick={() => router.push("/account")}
                  icon={
                    <CircleUserRound size={18} className="text-amber-600" />
                  }
                />

                {canAccessDashboard(session.user.role) && (
                  <MobileNavItem
                    label="Dashboard"
                    description="View your overview"
                    onClick={() =>
                      window.open(
                        `https://dashboard.${
                          process.env.NEXT_PUBLIC_BASE_DOMAIN
                        }/${session.user.role?.toLowerCase()}`,
                        "_blank"
                      )
                    }
                    icon={
                      <LayoutDashboard size={18} className="text-purple-600" />
                    }
                  />
                )}

                <MobileNavItem
                  label="Shared Listings"
                  description="Manage shared listings"
                  onClick={() =>
                    window.open(
                      `https://dashboard.${
                        process.env.NEXT_PUBLIC_BASE_DOMAIN
                      }/${session.user.role?.toLowerCase()}`,
                      "_blank"
                    )
                  }
                  icon={<Settings size={18} className="text-purple-600" />}
                />

                {canAccessInterested(session.user.role) && (
                  <MobileNavItem
                    label="Interested Listings"
                    description="Your favorites"
                    onClick={() =>
                      window.open(
                        `https://interested.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`,
                        "_blank"
                      )
                    }
                    icon={<Heart size={18} className="text-red-600" />}
                  />
                )}

                {/* {canPromote(session.user.role) && (
                  <MobileNavItem
                    label="Promote Listings"
                    description="Boost visibility"
                    onClick={() =>
                      window.open(
                        `https://promote.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`,
                        "_blank"
                      )
                    }
                    icon={<Rocket size={18} className="text-green-600" />}
                  />
                )} */}
              </>
            ) : (
              <>
                <MobileNavItem
                  label="Login"
                  description="Access your account"
                  onClick={() => router.push("/auth/login")}
                  icon={<User size={18} className="text-blue-600" />}
                />

                <MobileNavItem
                  label="Shared Listings"
                  description="Manage shared listings"
                  onClick={() => router.push("/auth/login")}
                  icon={<Heart size={18} className="text-red-600" />}
                />
                <MobileNavItem
                  label="Interested Listings"
                  description="Your favorites"
                  onClick={() => router.push("/auth/login")}
                  icon={<Heart size={18} className="text-red-600" />}
                />

                <MobileNavItem
                  label="Compare Listings"
                  description="Compare saved listings"
                  onClick={() => router.push("/compare")}
                  icon={<GitCompare size={18} className="text-orange-600" />}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
