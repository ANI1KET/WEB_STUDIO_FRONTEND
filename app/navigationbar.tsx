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
    <main className="min-h-screen flex flex-col">
      <Navbar session={session} />

      <section className="pt-16">{children}</section>

      {/* <Footer /> */}
    </main>
  );
};

export default NavigationBar;
