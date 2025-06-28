import { throttle } from "lodash";
import { useCallback, useRef } from "react";

import { useUpdateRoomFiletrsData } from "@/app/providers/reactqueryProvider";
import { RoomFilters } from "@/app/types/filters";

// ROOM
export const useRoomFilterUpdater = () => {
  const updateFilters = useUpdateRoomFiletrsData();
  const pendingFiltersRef = useRef<Partial<RoomFilters>>({});

  const throttledUpdateCache = useRef(
    throttle(
      () => {
        updateFilters(pendingFiltersRef.current);
        pendingFiltersRef.current = {};
      },
      1000,
      { leading: true, trailing: true }
    )
  ).current;

  const updateFilter = useCallback(
    <K extends keyof RoomFilters>(key: K, value: RoomFilters[K]) => {
      pendingFiltersRef.current = {
        ...pendingFiltersRef.current,
        [key]: value,
      };
      throttledUpdateCache();
    },
    [throttledUpdateCache]
  );

  return updateFilter;
};
