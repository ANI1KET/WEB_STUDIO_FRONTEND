"use client";

import {
  Car,
  Home,
  Wifi,
  Bike,
  Sofa,
  Waves,
  Trees,
  House,
  Flame,
  Droplet,
  Factory,
  DoorOpen,
  Snowflake,
  ShowerHead,
  ArrowUpDown,
  Refrigerator,
  FlameKindling,
  WashingMachine,
  BatteryCharging,
} from "lucide-react";
import React from "react";
import { RoomAmenities } from "@/app/types/types";

const amenityIcons: Record<string, React.ElementType> = {
  WIFI: Wifi,
  SOFA: Sofa,
  POOL: Waves,
  GARDEN: Trees,
  AC: Snowflake,
  TERRACE: House,
  "CAR PARK": Car,
  CHIMNEY: Factory,
  "BIKE PARK": Bike,
  BALCONY: DoorOpen,
  LIFT: ArrowUpDown,
  GEYSER: ShowerHead,
  OVEN: FlameKindling,
  FRIDGE: Refrigerator,
  "FIRE SAFETY": Flame,
  "24/7 WATER": Droplet,
  "POWER BACKUP": BatteryCharging,
  "WASHING MACHINE": WashingMachine,
};

export const getAmenityIcon = (amenity: RoomAmenities, size: number) => {
  const Icon = amenityIcons[amenity.toUpperCase()] || Home;
  return <Icon size={size} />;
};
