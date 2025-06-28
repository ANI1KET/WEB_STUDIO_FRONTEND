"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";

import { RoomData } from "../types/types";

export const useCompareItems = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    const storedRooms = JSON.parse(
      localStorage.getItem("ComparisonRooms") || "[]"
    );
    setRooms(storedRooms);
  }, []);

  const removeRoom = (id: string) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    localStorage.setItem("ComparisonRooms", JSON.stringify(updatedRooms));
    setRooms(updatedRooms);
    toast.success("Room removed from the comparison list");
  };
  const clearRooms = () => {
    localStorage.removeItem("ComparisonRooms");
    setRooms([]);
    toast.success("All rooms removed from the comparison list");
  };

  // const existingProperties = JSON.parse(
  //   localStorage.getItem("ComparisionProperties") || "[]"
  // ) as any;
  // const removeProperty = (id: string) => {
  //   const updatedProperties = existingProperties.filter(
  //     (property) => property.id !== id
  //   );
  //   localStorage.setItem(
  //     "ComparisionProperties",
  //     JSON.stringify(updatedProperties)
  //   );
  // };
  // const clearProperties = () => {
  //   localStorage.removeItem("ComparisionProperties");
  // };

  // const existingVehicles = JSON.parse(
  //   localStorage.getItem("ComparisionVehicles") || "[]"
  // ) as any;
  // const removeVehicle = (id: string) => {
  //   const updatedVehicles = existingVehicles.filter(
  //     (vehicle) => vehicle.id !== id
  //   );
  //   localStorage.setItem(
  //     "ComparisionVehicles",
  //     JSON.stringify(updatedVehicles)
  //   );
  // };
  // const clearVehicles = () => {
  //   localStorage.removeItem("ComparisionVehicles");
  // };

  return {
    rooms,
    clearRooms,
    removeRoom,
    // clearVehicles,
    // removeVehicle,
    // removeProperty,
    // clearProperties,
    roomsCount: rooms.length,
    // vehiclesCount: existingVehicles.length,
    // propertiesCount: existingProperties.length,
    vehiclesCount: 0,
    propertiesCount: 0,
  };
};
