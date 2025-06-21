"use client";

import {
  QueryClient,
  // useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { makeVar, useReactiveVar } from "@apollo/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  RoomFilters,
  RoomSearchQueries,
  PropertySearchQueries,
} from "../types/filters";

export const searchRoomData = makeVar<RoomSearchQueries>({
  city: "",
  roomType: [],
  postedBy: [],
  amenities: [],
  locations: [],
  price: undefined,
  rating: undefined,
  capacity: undefined,
  verified: undefined,
  furnishingStatus: [],
});

export const searchPropertyData = makeVar<PropertySearchQueries>({
  city: "",
  locations: [],
  propertyType: "House",

  area: undefined,
  price: undefined,
  // verified: undefined,

  // amenities: [],
  // floors: undefined,
  // bedrooms: undefined,
  // kitchens: undefined,
  // bathrooms: undefined,
  builtUpArea: undefined,

  // plotWidth: undefined,
  // plotLength: undefined,
});

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [queryClient] = useState(() => {
  //   const client = new QueryClient();
  //   return client;
  // });
  const queryClient = new QueryClient();

  // queryClient.setQueryDefaults(["city"], {
  //   enabled: false,
  //   gcTime: Infinity,
  //   staleTime: Infinity,
  // });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// export function useGetCity() {
//   const queryClient = useQueryClient();

//   return queryClient.getQueryData<string>(["city"]);
// }

// export function useSetCity() {
//   const queryClient = useQueryClient();

//   return (city: string) => {
//     queryClient.setQueryData(["city"], city);
//   };
// }

// ROOM
export function useGetRoomSearchData() {
  return useReactiveVar(searchRoomData);
}

export function setRoomSearchData(filtersToApply: RoomSearchQueries) {
  const prevData = searchRoomData();

  searchRoomData({
    ...prevData,
    ...filtersToApply,
  });
}

export function useUpdateRoomSearchData() {
  return (filtersToApply: RoomSearchQueries) => {
    searchRoomData({
      ...filtersToApply,
    });
  };
}

export function useUpdateRoomFiletrsData() {
  return (filtersToApply: Partial<RoomFilters>) => {
    const prevData = searchRoomData();

    searchRoomData({
      ...prevData,
      ...filtersToApply,
    });
  };
}

// PROPERTY
export function useGetPropertySearchData() {
  return useReactiveVar(searchPropertyData);
}

export function setPropertySearchData(filtersToApply: PropertySearchQueries) {
  const prevData = searchPropertyData();

  searchPropertyData({
    ...prevData,
    ...filtersToApply,
  });
}

export function useUpdatePropertySearchData() {
  return (filtersToApply: PropertySearchQueries) => {
    searchPropertyData({
      ...filtersToApply,
    });
  };
}
