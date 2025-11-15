import { Role } from "@prisma/client";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { cn } from "@/app/lib/utils";
import { RoomData } from "@/app/types/types";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchRoom } from "@/app/components/selected/room/[id]/ServerAction/RoomPageLayout";

import FeaturedRoomsSection from "@/app/common/ui/FeaturedRoomsSection";
import MoreRoomLayout from "@/app/components/selected/room/[id]/MoreRoomLayout";
import RoomDetailsMain from "@/app/components/selected/room/[id]/RoomDetailsMain";
import RoomAmenitiesLayout from "@/app/components/selected/room/[id]/RoomAmenities";
import RoomDetailsAction from "@/app/components/selected/room/[id]/RoomDetailsAction";
import OptimizedRoomGallery from "@/app/components/selected/room/[id]/OptimizedRoomGallery";

const decodeURLPlaceQuery = (query: string): string => {
  try {
    const urlDecoded = decodeURIComponent(query);
    const decoded = atob(urlDecoded);

    return decoded;
  } catch (error) {
    console.error("Error decoding query parameter:", error);
    return "";
  }
};

export default async function Room({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const roomId = id ? decodeURLPlaceQuery(id) : null;

  if (!roomId) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  try {
    const roomData = await fetchRoom(roomId);
    const featuredRooms: RoomData[] = [];

    const featuredRoomExist = featuredRooms.length > 0;

    return (
      <div className="bg-white min-h-screen font-sans antialiased">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <div
              style={{ animationDelay: "100ms" }}
              className="overflow-hidden shadow-2xl border border-green-100/50 rounded-3xl bg-white/95 backdrop-blur-sm hover:shadow-green-200/40 transition-shadow duration-300 animate-fade-in"
            >
              <OptimizedRoomGallery
                title={roomData.title}
                photos={roomData.photos}
                videos={roomData.videos}
              />
            </div>

            <div
              className={cn(
                "grid gap-3 animate-fade-in grid-cols-1",
                featuredRoomExist && "md:grid-cols-3"
              )}
            >
              <div
                className={cn(
                  "col-span-1",
                  featuredRoomExist && "md:col-span-2"
                )}
              >
                <div className="space-y-8">
                  <RoomDetailsAction
                    roomData={roomData}
                    number={session?.user.number}
                    role={session?.user.role as Role}
                    isAuthenticated={Boolean(session)}
                    userId={session?.user.userId as string}
                  />

                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100/50 overflow-hidden hover:shadow-green-200/40 transition-all duration-300">
                    <RoomDetailsMain
                      hall={roomData.hall}
                      bedroom={roomData.bedroom}
                      kitchen={roomData.kitchen}
                      bathroom={roomData.bathroom}
                      roomType={roomData.roomType}
                      createdAt={roomData.createdAt}
                      updatedAt={roomData.updatedAt}
                      direction={roomData.direction}
                      minCapacity={roomData.minCapacity}
                      maxCapacity={roomData.maxCapacity}
                      description={roomData.description}
                      furnishingStatus={roomData.furnishingStatus}
                    />
                  </div>

                  <RoomAmenitiesLayout amenities={roomData.amenities} />
                </div>
              </div>

              {featuredRoomExist && (
                <div
                  className={cn(
                    "hidden md:block md:col-span-1 sticky top-5 h-fit"
                  )}
                >
                  <FeaturedRoomsSection
                    featuredRooms={featuredRooms}
                    height="min-h-[675px] max-h-[calc(100vh-4rem)]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="py-4 sm:py-8 px-4 bg-gradient-to-r from-green-50/80 via-white/50 to-green-50/80 border-t border-green-200/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Explore More Rooms in {roomData.city}
              </h2>

              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Still looking? There&apos;s more to see in {roomData.city}.
              </p>
            </div>

            <MoreRoomLayout city={roomData.city} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);

    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-white to-green-100 px-6 py-12 animate-fade-in">
        <div className="bg-white/90 backdrop-blur-md border border-green-200 shadow-xl rounded-3xl max-w-xl w-full p-8 space-y-6 text-center transition-all duration-300 hover:shadow-green-300/40 hover:scale-[1.01]">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 border border-green-300 shadow-inner animate-pulse">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-green-700 tracking-tight">
            Room Details Couldn&apos;t Be Loaded
          </h2>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Something went wrong while fetching this room&apos;s details. It
            might be removed or temporarily unavailable. Please try again later
            or browse other available rooms
          </p>

          <p className="text-sm text-gray-500 italic">
            We appreciate your patience and apologize for the inconvenience.
          </p>
        </div>
      </div>
    );
  }
}
