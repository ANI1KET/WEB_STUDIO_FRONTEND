"use client";

import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react";

import { ListedRoom } from "@/app/types/types";

import { Button } from "../../ui/button";
import RoomInfo from "./SearchResults/RoomInfo";
import RoomStatus from "./SearchResults/RoomStatus";
import ImageCarousel from "./SearchResults/ImageCarousel";
import { Card, CardContent } from "@/app/components/ui/card";

interface SearchResultsProps {
  rooms: ListedRoom[];
}

const SearchResults: React.FC<SearchResultsProps> = memo(({ rooms }) => {
  const router = useRouter();

  const [showVideo, setShowVideo] = useState(false);

  const handleToggleVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(!showVideo);
  };

  const handleViewDetails = (roomId: string) => {
    router.push(`/room/${btoa(roomId)}`);
  };

  if (rooms.length === 0) {
    return <NoResults />;
  }
  return (
    <>
      {rooms.map((room) => (
        <Card
          key={room.id}
          className="hover:shadow-2xl transition-all duration-300 transform border-0 overflow-hidden rounded-2xl bg-white flex flex-col"
        >
          {/* Image/Video Section */}
          <div className="relative">
            <ImageCarousel
              photos={room.photos}
              videos={room.videos}
              roomTitle={room.title}
              showVideo={showVideo}
              onToggleVideo={handleToggleVideo}
            />
            <RoomStatus verified={room.verified} available={room.available} />
          </div>

          {/* Content */}
          <CardContent className="flex-grow flex flex-col p-0">
            <RoomInfo
              city={room.city}
              title={room.title}
              price={room.price}
              ratings={room.ratings}
              location={room.location}
              roomType={room.roomType}
              postedBy={room.postedBy}
              minCapacity={room.minCapacity}
              maxCapacity={room.maxCapacity}
              furnishingStatus={room.furnishingStatus}
            />

            {/* View Details Button */}
            <div className="px-4 pb-2">
              <Button
                size="sm"
                onClick={() => handleViewDetails(room.id)}
                className="w-full hover:bg-green-200 text-white text-xs px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
});

SearchResults.displayName = "SearchResults";
export default React.memo(SearchResults);

const NoResults = () => {
  return (
    <div className="col-span-2 lg:col-span-3 flex items-center justify-center">
      <div className="w-full flex justify-center items-center py-20 px-4 min-h-[calc(100vh-5rem)]">
        <div className="group max-w-md w-full bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl text-center hover:bg-emerald-50">
          <div
            className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6
                   group-hover:animate-bounce"
          >
            <MapPin className="h-12 w-12 text-emerald-500" />
          </div>

          <h3 className="text-2xl font-bold text-emerald-700 mb-3 transition-colors duration-300 group-hover:text-emerald-800">
            No rooms match your current filters
          </h3>

          <p className="text-gray-700 leading-relaxed text-base transition-all duration-300 group-hover:text-emerald-600 group-hover:tracking-wide">
            No results were found. Try adjusting your filters or exploring
            nearby locations to discover available rooms.
          </p>
        </div>
      </div>
    </div>
  );
};
