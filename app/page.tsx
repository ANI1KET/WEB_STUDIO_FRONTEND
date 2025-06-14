export const dynamic = "force-dynamic";

import {
  dehydrate,
  QueryClient,
  InfiniteData,
  HydrationBoundary,
} from "@tanstack/react-query";

import {
  RoomData,
  //  PropertyData,
  CategoryCitiesLocations,
} from "./types/types";

import { getCategoryCitiesLocationDetails } from "./serverAction";

import RoomsByCity from "@/app/components/home/RoomsByCity";
import SmartSearch from "@/app/components/home/SmartSearch";
// import CallToAction from "@/app/components/CallToAction";
// import VehiclesByCity from "@/app/components/VehiclesByCity";
// import PropertiesByType from "@/app/components/PropertiesByType";
import ExploreCategories from "@/app/components/home/ExploreCategories";

const Home = async () => {
  const queryClient = new QueryClient();

  try {
    const {
      city,
      roomCityDetails,
      roomCitiesLocations,
    }: // propertyCityDetails,
    // propertyCitiesLocations,
    {
      city: string;
      roomCityDetails: RoomData[];
      // propertyCityDetails: PropertyData[];
      roomCitiesLocations: CategoryCitiesLocations;
      // propertyCitiesLocations: CategoryCitiesLocations;
    } = await getCategoryCitiesLocationDetails();

    // queryClient.setQueryData<string>(["city"], city);

    queryClient.setQueryData<CategoryCitiesLocations>(
      ["roomCitiesLocations"],
      roomCitiesLocations
    );

    queryClient.setQueryData<InfiniteData<RoomData[]>>([`room${city}`], {
      pageParams: [0],
      pages: [roomCityDetails],
    });

    // queryClient.setQueryData<InfiniteData<PropertyData[]>>(
    //   [`property${city}`],
    //   {
    //     pageParams: [0],
    //     pages: [propertyCityDetails],
    //   }
    // );
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section className="flex-grow ">
          <div className="relative bg-[url('/bg_images/image_1.webp')] bg-cover bg-center min-h-[calc(100vh-4rem)] flex items-center ">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-green-900/30 to-black/70 backdrop-blur-[1px]"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                  <span className="text-white drop-shadow-lg relative inline-block">
                    Find Your Perfect Space in Nepal
                    <span className="absolute -inset-1 rounded-lg bg-white/5 blur-md -z-10"></span>
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-green-50 mb-8 max-w-3xl mx-auto font-light drop-shadow-md">
                  Discover rooms, properties, vehicles and more - all in one
                  place with
                  <span className="font-bold text-white relative ml-2 inline-block">
                    AfnoSansaar
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0"></span>
                  </span>
                </p>

                {/* Smart Search component */}
                <div className="mt-10 ">
                  <SmartSearch />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-green-500/10 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-10 w-24 h-24 rounded-full bg-green-300/10 blur-2xl animate-pulse [animation-delay:1.5s]"></div>
          </div>

          <ExploreCategories />
          <RoomsByCity city={city} cities={Object.keys(roomCitiesLocations)} />
          {/* <PropertiesByType /> */}
          {/* <VehiclesByCity /> */}
          {/* <CallToAction /> */}
        </section>
      </HydrationBoundary>
    );
  } catch (error) {
    console.error("Failed to load details:", error);

    return (
      <div className="w-screen h-screen flex items-center justify-center text-red-500 p-4 text-center">
        Failed to load data. Please try again later.
      </div>
    );
  }
};

export default Home;
