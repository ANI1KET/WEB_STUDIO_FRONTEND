import Script from "next/script";
import type { Metadata } from "next";

import "./globals.css";

import AuthProvider from "./providers/authProvider";
import { TooltipProvider } from "./providers/tooltipProvider";
import ReactQueryProvider from "./providers/reactqueryProvider";

import NavigationBar from "./navigationbar";
import { Toaster } from "./components/ui/toaster";

export const metadata: Metadata = {
  icons: {
    icon: "/AFNOSANSAAR.png",
  },
  title: "AfnoSansaar - Nepal's Trusted Local Services & Rentals Hub",
  description:
    "AfnoSansaar is Nepal's one-stop platform to find and rent rooms, buy or sell property, vehicles, and second-hand goods, or access trusted local services—all without brokers. Simple, fast, and reliable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N3S708NG1H"
        ></Script>
        
        <Script id="Google_Analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-N3S708NG1H');
          `}
        </Script>
      </head>
      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <NavigationBar>{children}</NavigationBar>
            </TooltipProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
