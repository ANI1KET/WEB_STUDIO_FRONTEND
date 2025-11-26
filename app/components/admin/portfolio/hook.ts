"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getAllEvent,
  modifyEvent,
  removeEvent,
  PortfolioEvent,
  registerEvent,
} from "@/app/ServerAction/portfolioApis";

export const usePortfolioEvents = () => {
  const queryClient = useQueryClient();

  const query = useQuery<PortfolioEvent[], Error>({
    queryKey: ["portfolioEvents"],
    queryFn: async () => getAllEvent(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const createEvent = useMutation({
    mutationFn: registerEvent,
    onSuccess: (newEvent) => {
      queryClient.setQueryData<PortfolioEvent[]>(["portfolioEvents"], (old) => [
        ...(old ?? []),
        newEvent,
      ]);
    },
    onError: (err: any) => {
      alert("Failed to create event: " + err.message);
      console.error(err);
    },
  });

  const updateEvent = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<PortfolioEvent, "id">;
    }) => modifyEvent(id, data),
    onSuccess: (updatedEvent) => {
      queryClient.setQueryData<PortfolioEvent[]>(["portfolioEvents"], (old) =>
        (old ?? []).map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
    },
    onError: (err: any) => {
      alert("Failed to update event: " + err.message);
      console.error(err);
    },
  });

  const deleteEvent = useMutation({
    mutationFn: removeEvent,
    onSuccess: (_data, id: string) => {
      queryClient.setQueryData<PortfolioEvent[]>(["portfolioEvents"], (old) =>
        (old ?? []).filter((e) => e.id !== id)
      );
    },
    onError: (err: any) => {
      alert("Failed to delete event: " + err.message);
      console.error(err);
    },
  });

  return { query, createEvent, updateEvent, deleteEvent };
};
