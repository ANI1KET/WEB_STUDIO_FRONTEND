"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              <span className="text-gold">Events</span>
              <span className="text-foreground">OC</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                Events <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                Services <ChevronDown className="h-4 w-4" />
              </button>
              <Link
                href="/gallery"
                className="text-foreground hover:text-primary transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/portfolio"
                className="text-foreground hover:text-primary transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/faq"
                className="text-foreground hover:text-primary transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
            <Button className="bg-gold hover:bg-gold/90 text-background">
              Book Now
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-3 pt-4">
            <button className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Events
            </button>
            <button className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <Link
              href="/gallery"
              className="py-2 text-foreground hover:text-primary transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="py-2 text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="py-2 text-foreground hover:text-primary transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/faq"
              className="py-2 text-foreground hover:text-primary transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="py-2 text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Button className="bg-gold hover:bg-gold/90 text-background mt-2">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
