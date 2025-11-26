"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Instagram, Facebook } from "lucide-react";

import { settingsApi, SiteSettings } from "@/app/ServerAction/settingsApis";

export const Footer = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    phone: "",
    email: "",
    location: "",
    quickLinks: [],
    popularServices: [],
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsApi.get();
      setSettings(data);
    } catch (error) {
      console.error("Failed to load settings ", error);
    }
  };

  const quickLinks =
    settings.quickLinks.length > 0
      ? settings.quickLinks
      : ["Home", "About Us", "Gallery", "FAQs"];

  const popularServices =
    settings.popularServices.length > 0
      ? settings.popularServices
      : ["Venue Sourcing", "Catering", "Styles & Designs", "Floral"];

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-3xl font-bold mb-4">
            <span className="text-gold">Events</span>
            <span className="text-foreground">OC</span>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            We are more than an event planning service — we create worlds where
            luxury meets wild freedom. Every moment we craft is designed to be
            felt, remembered, and never replicated.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gold text-lg font-serif mb-4 tracking-wider">
                QUICK LINKS
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-foreground/70 hover:text-gold transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-gold text-lg font-serif mb-4 tracking-wider">
                POPULAR SERVICES
              </h3>
              <ul className="space-y-2">
                {popularServices.map((service, index) => (
                  <li key={index}>
                    <a
                      href="#services"
                      className="text-foreground/70 hover:text-gold transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-gold text-lg font-serif mb-4 tracking-wider">
                TERMS & POLICIES
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-foreground/70 hover:text-gold transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-foreground/70 hover:text-gold transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="text-foreground/70 hover:text-gold transition-colors"
                  >
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold text-lg font-serif mb-4 tracking-wider">
                CONTACT
              </h3>
              <ul className="space-y-2">
                <li className="text-foreground/70">
                  📞 {settings.phone || "0426006760"}
                </li>
                <li className="text-foreground/70">
                  ✉️ {settings.email || "the.events.oc@gmail.com"}
                </li>
                <li className="text-foreground/70">
                  📍 {settings.location || "Gold Coast"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
