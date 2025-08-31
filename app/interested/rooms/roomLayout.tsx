"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// import { Lister } from "@/app/types/types";
import { getInterestedRooms } from "@/app/common/serverAction/interestedRooms";

import { Card, CardContent } from "@/app/components/ui/card";
import RoomsList from "@/app/components/interested/rooms/RoomsList";
import RoomsHeader from "@/app/components/interested/rooms/RoomsHeader";
import ListerHeader from "@/app/components/interested/rooms/ListerHeader";
import RoomsAnalytics from "@/app/components/interested/rooms/RoomsAnalytics";
import EmptyRoomsState from "@/app/components/interested/rooms/EmptyRoomsState";
// import FloatingChatWidget from "@/app/components/interested/rooms/FloatingChatWidget";

const InterestedRoomsLayout = () => {
  const { data: interestedRooms = [] } = useQuery({
    queryKey: ["InterestedRooms"],
    queryFn: () => getInterestedRooms(),
    enabled: false,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const totalListers = interestedRooms.length;
  const totalRooms = interestedRooms.reduce(
    (sum, listerRooms) => sum + listerRooms.rooms.length,
    0
  );
  const ownerListers = interestedRooms.filter(
    (listerRooms) => listerRooms.lister.role === "OWNER"
  ).length;
  const brokerListers = interestedRooms.filter(
    (listerRooms) => listerRooms.lister.role === "BROKER"
  ).length;
  const averageRoomsPerLister =
    totalListers > 0 ? (totalRooms / totalListers).toFixed(1) : "0";

  const [expandedListers, setExpandedListers] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleListerExpanded = (listerId: string) => {
    setExpandedListers((prev) => ({
      ...prev,
      [listerId]: !prev[listerId],
    }));
  };

  // const [isChatOpen, setIsChatOpen] = useState(false);
  // const [selectedLister, setSelectedLister] = useState<Lister | null>(null);

  // const handleCloseChatWidget = () => {
  //   setIsChatOpen(false);
  //   setSelectedLister(null);
  // };

  // const handleMessageSent = (message: string) => {
  //   console.log(message);
  // };

  // const handleChatWithLister = (lister: Lister) => {
  //   setSelectedLister(lister);
  //   setIsChatOpen(true);
  // };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <RoomsHeader roomsCount={totalRooms} />

        <RoomsAnalytics
          totalRooms={totalRooms}
          totalListers={totalListers}
          ownerListers={ownerListers}
          brokerListers={brokerListers}
          averageRoomsPerLister={averageRoomsPerLister}
        />

        {interestedRooms.length > 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {interestedRooms.map((listerList) => {
              const isExpanded = expandedListers[listerList.id] ?? false;

              return (
                <Card
                  key={listerList.id}
                  className="overflow-hidden shadow-lg border-0 bg-white/90 backdrop-blur-sm"
                >
                  <CardContent className="p-0">
                    <ListerHeader
                      isExpanded={isExpanded}
                      lister={listerList.lister}
                      roomCount={listerList.rooms.length}
                      onToggleExpanded={() =>
                        toggleListerExpanded(listerList.id)
                      }
                      // onChatWithLister={() =>
                      //   handleChatWithLister(listerList.lister)
                      // }
                    />

                    {isExpanded && (
                      <RoomsList
                        id={listerList.id}
                        roomIds={listerList.rooms}
                      />
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <EmptyRoomsState />
        )}
      </div>

      {/* {selectedLister && (
        <FloatingChatWidget
          isOpen={isChatOpen}
          lister={selectedLister}
          onClose={handleCloseChatWidget}
          onSendMessage={handleMessageSent}
        />
      )} */}
    </div>
  );
};

export default InterestedRoomsLayout;
