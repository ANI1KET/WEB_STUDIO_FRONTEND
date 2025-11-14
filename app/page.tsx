import {
  dehydrate,
  QueryClient,
  InfiniteData,
  HydrationBoundary,
} from "@tanstack/react-query";
// import { headers } from "next/headers";

import { getRoomCitiesLocationDetails } from "./serverAction";
import { RoomData, CategoryCitiesLocations } from "./types/types";

import SmartSearch from "@/app/components/home/SmartSearch";
import RentalSection from "@/app/components/home/RentalSection";
import ServiceSection from "@/app/components/home/ServiceSection";
// import AdvertisementSection from "./common/ui/AdvertisementSection";

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

  // queryClient.setQueryData<string>(["city"], city);

  queryClient.setQueryData<CategoryCitiesLocations>(
    ["roomCitiesLocations"],
    roomCitiesLocations
  );
  queryClient.setQueryData<InfiniteData<RoomData[]>>([`room${city}`], {
    pageParams: [0],
    pages: [roomCityDetails],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex-grow">
        <div
          style={{
            backgroundSize: "103.5% 200%",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url('/image.png')",
            backgroundPosition: "left 80% top 51.5%",
          }}
          className="relative min-h-[calc(100vh-4rem)] flex items-center"
        >
          {/* <video
            loop
            muted
            autoPlay
            playsInline
            src="/video.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          /> */}

          <div className="max-w-xl mx-auto text-center relative z-10 w-full p-[5px]">
            <SmartSearch />
          </div>
        </div>

        <ServiceSection />

        {/* <div className="hidden md:block">
          <AdvertisementSection />
        </div> */}

        <RentalSection city={city} cities={Object.keys(roomCitiesLocations)} />
      </section>
    </HydrationBoundary>
  );
};

export default Home;
