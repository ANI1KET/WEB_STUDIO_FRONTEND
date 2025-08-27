export const dynamic = "force-dynamic";

import {
  dehydrate,
  QueryClient,
  InfiniteData,
  HydrationBoundary,
} from "@tanstack/react-query";
// import { headers } from "next/headers";

import {
  RoomData,
  // PropertyData,
  CategoryCitiesLocations,
} from "./types/types";
import { getRoomCitiesLocationDetails } from "./serverAction";

import RoomsByCity from "@/app/components/home/RoomsByCity";
import SmartSearch from "@/app/components/home/SmartSearch";
import ServiceSection from "@/app/components/home/ServiceSection";

const Home = async () => {
  // const headersList = await headers();
  // const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip");

  const city = "Kathmandu";

  const queryClient = new QueryClient();
  const {
    roomCityDetails,
    roomCitiesLocations,
  }: {
    roomCityDetails: RoomData[];
    roomCitiesLocations: CategoryCitiesLocations;
  } = await getRoomCitiesLocationDetails(city);

  // const {
  //   propertyCityDetails,
  //   propertyCitiesLocations,
  // }: {
  //   propertyCityDetails: PropertyData[];
  //   propertyCitiesLocations: CategoryCitiesLocations;
  // } = await ;

  // queryClient.setQueryData<string>(["city"], city);

  queryClient.setQueryData<CategoryCitiesLocations>(
    ["roomCitiesLocations"],
    roomCitiesLocations
  );
  queryClient.setQueryData<InfiniteData<RoomData[]>>([`room${city}`], {
    pageParams: [0],
    pages: [roomCityDetails],
  });

  // queryClient.setQueryData<CategoryCitiesLocations>(
  //   ["propertyCitiesLocations"],
  //   roomCitiesLocations
  // );
  // queryClient.setQueryData<InfiniteData<PropertyData[]>>(
  //   [`property${city}`],
  //   {
  //     pageParams: [0],
  //     pages: [propertyCityDetails],
  //   }
  // );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex-grow bg-gradient-to-br from-green-50 via-green-100 to-emerald-50">
        <div className="relative min-h-[calc(100vh-4rem)] flex items-center">
          {/* <video
            loop
            muted
            autoPlay
            playsInline
            src="/video.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          /> */}

          <div className="absolute inset-0 bg-gradient-to-b from-green-400/20 via-green-300/10 to-green-400/30"></div>

          <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-green-800 drop-shadow-lg relative inline-block">
                Find Your Perfect Space in Nepal
                <span className="absolute -inset-1 rounded-lg bg-white/5 blur-md -z-10"></span>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-green-700 mb-8 max-w-3xl mx-auto font-light drop-shadow-md">
              Discover rooms, properties, vehicles and more - all in one place
              with
              <span className="font-bold text-green-800 relative ml-2 inline-block">
                AfnoSansaar
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0"></span>
              </span>
            </p>

            <div className="p-1.5">
              <SmartSearch />
            </div>
          </div>
        </div>

        <ServiceSection />
        <RoomsByCity city={city} cities={Object.keys(roomCitiesLocations)} />

        {/* <PropertiesByType /> */}
        {/* <VehiclesByCity /> */}
        {/* <CallToAction /> */}
      </section>
    </HydrationBoundary>
  );
};

export default Home;
