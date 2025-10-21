import { getServerSession } from "next-auth";

import Navbar from "./components/home/Navbar";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const metadata = {
  title: "AfnoSansaar - Find Rooms, Properties, Vehicles in Nepal",
  description:
    "AfnoSansaar - Nepal's premier marketplace for rooms, properties, vehicles and pre-owned items. Find your perfect space in Nepal.",
  openGraph: {
    title: "AfnoSansaar - Find Your Perfect Space in Nepal",
  },
};

const NavigationBar = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar session={session} />

      <section className="pt-16">{children}</section>

      {/* <Footer /> */}
    </main>
  );
};

export default NavigationBar;

// "use client";

// import { useEffect } from "react";

// // import Footer from "@/components/Footer";
// import Navbar from "./components/home/Navbar";

// const NavigationBar = ({ children }: { children: React.ReactNode }) => {
//   useEffect(() => {
//     // Update document title and meta tags for SEO
//     document.title = "AfnoSansaar - Find Rooms, Properties, Vehicles in Nepal";

//     // Update meta description
//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//       metaDescription.setAttribute(
//         "content",
//         "AfnoSansaar - Nepal's premier marketplace for rooms, properties, vehicles and pre-owned items. Find your perfect space in Nepal."
//       );
//     }

//     // Update OG title
//     const ogTitle = document.querySelector('meta[property="og:title"]');
//     if (ogTitle) {
//       ogTitle.setAttribute(
//         "content",
//         "AfnoSansaar - Find Your Perfect Space in Nepal"
//       );
//     }
//   }, []);

//   return (
//     <main className="min-h-screen flex flex-col overflow-x-hidden">
//       <Navbar />

//       <section className="pt-16">{children}</section>

//       {/* <Footer /> */}
//     </main>
//   );
// };

// export default NavigationBar;
