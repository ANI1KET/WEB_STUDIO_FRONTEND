"use client";

import {
  Home,
  Menu,
  LogOut,
  Images,
  Briefcase,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Images, label: "Portfolio", path: "/admin/portfolio" },
  { icon: Home, label: "Homepage", path: "/admin/homepage" },
  { icon: Briefcase, label: "Services", path: "/admin/services" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = usePathname();
  const navigate = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut({ redirect: false });
    navigate.push("/");
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">
          EventsOC Admin
        </h1>
        <p className="text-sm text-sidebar-foreground/70 mt-1">
          Content Management
        </p>
      </div>

      <div className="p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-muted">
      <aside className="hidden lg:flex w-64 bg-sidebar border-r border-sidebar-border flex-col">
        <SidebarContent />
      </aside>

      <main className="flex-1 overflow-auto">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <h2 className="font-semibold">EventsOC Admin</h2>
            <div className="w-10" />
          </div>
          <SheetContent
            side="left"
            className="w-64 bg-sidebar border-sidebar-border p-0"
          >
            <div className="flex flex-col h-full">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
};
