import {
  dehydrate,
  QueryClient,
  InfiniteData,
  HydrationBoundary,
} from "@tanstack/react-query";

import { cn } from "@/app/lib/utils";
import { RoomData } from "@/app/types/types";
import { getRoomCitiesLocationDetails } from "@/app/serverAction";

import RoomsCity from "./RoomsCity";
import FeaturedRoomsSection from "@/app/common/ui/FeaturedRoomsSection";

const Rooms = async ({ params }: { params: Promise<{ city: string }> }) => {
  const { city } = await params;
  const queryClient = new QueryClient();

  const {
    roomCityDetails,
  }: {
    roomCityDetails: RoomData[];
  } = await getRoomCitiesLocationDetails(city);
  const featuredRooms: RoomData[] = [];

  const featuredRoomExist = featuredRooms.length > 0;

  queryClient.setQueryData<InfiniteData<RoomData[]>>([`room${city}`], {
    pageParams: [0],
    pages: [roomCityDetails],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-7xl mx-auto px-4 py-2">
        <h1 className="text-3xl text-center pb-6 font-bold">
          Rooms in{" "}
          <span className="bg-green-600 bg-clip-text text-transparent transition-all duration-300 drop-shadow-sm">
            {city}
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          <div
            className={cn(
              "col-span-1 sm:col-span-2",
              featuredRoomExist
                ? "lg:col-span-2 xl:col-span-3"
                : "lg:col-span-3 xl:col-span-4"
            )}
          >
            <RoomsCity city={city} />
          </div>

          {featuredRoomExist && (
            <div className="hidden lg:block col-span-1 sticky top-5 h-fit">
              <FeaturedRoomsSection
                featuredRooms={featuredRooms}
                height="min-h-[675px] max-h-[calc(100vh-4rem)]"
              />
            </div>
          )}
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default Rooms;
