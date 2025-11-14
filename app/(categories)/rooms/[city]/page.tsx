import {
  dehydrate,
  QueryClient,
  InfiniteData,
  HydrationBoundary,
} from "@tanstack/react-query";

import { RoomData } from "@/app/types/types";

import RoomsCity from "./RoomsCity";
import { getRoomCitiesLocationDetails } from "@/app/serverAction";

const Rooms = async ({ params }: { params: Promise<{ city: string }> }) => {
  const { city } = await params;
  const queryClient = new QueryClient();

  const {
    roomCityDetails,
  }: {
    roomCityDetails: RoomData[];
  } = await getRoomCitiesLocationDetails(city);

  queryClient.setQueryData<InfiniteData<RoomData[]>>([`room${city}`], {
    pageParams: [0],
    pages: [roomCityDetails],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-7xl mx-auto px-4 py-2 flex-grow">
        <h1 className="text-3xl pb-6 font-bold">
          Rooms in{" "}
          <span className="bg-green-600 bg-clip-text text-transparent transition-all duration-300 drop-shadow-sm">
            {city}
          </span>
        </h1>

        <RoomsCity city={city} />
      </main>
    </HydrationBoundary>
  );
};

export default Rooms;
