export const dynamic = "force-dynamic";

import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import InterestedRoomsLayout from "./roomLayout";
import { InterestedRooms } from "@/app/types/types";
import { getInterestedRooms } from "@/app/common/serverAction/interestedRooms";

const Rooms = async () => {
  const queryClient = new QueryClient();

  const interestedRooms: InterestedRooms[] = await getInterestedRooms();

  queryClient.setQueryData<InterestedRooms[]>(
    ["InterestedRooms"],
    interestedRooms
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InterestedRoomsLayout />
    </HydrationBoundary>
  );
};

export default Rooms;

// import InterestedRoomsLayout from "./roomLayout";
// import { InterestedRooms } from "@/app/types/types";
// import { getInterestedRooms } from "@/app/common/serverAction/interestedRooms";

// const Rooms = async () => {
//   const {
//     interestedRooms,
//   }: {
//     interestedRooms: InterestedRooms[];
//   } = await getInterestedRooms();

//   return <InterestedRoomsLayout interestedRooms={interestedRooms} />;
// };

// export default Rooms;
