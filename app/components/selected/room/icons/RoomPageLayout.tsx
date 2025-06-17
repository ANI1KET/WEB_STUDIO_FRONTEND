"use client";

import {
  Sun,
  Car,
  Wifi,
  Bike,
  Waves,
  BookOpen,
  Dumbbell,
  Droplets,
  ShieldCheck,
  ChevronUpSquare,
  GalleryHorizontal,
} from "lucide-react";
import React from "react";

export const amenityIcons: { [key: string]: React.ReactNode } = {
  WIFI: <Wifi size={20} />,
  POOL: <Waves size={20} />,
  TERRACE: <Sun size={20} />,
  GYM: <Dumbbell size={20} />,
  "CAR PARK": <Car size={20} />,
  "BIKE PARK": <Bike size={20} />,
  LIFT: <ChevronUpSquare size={20} />,
  SECURITY: <ShieldCheck size={20} />,
  "24/7 WATER": <Droplets size={20} />,
  "STUDY AREA": <BookOpen size={20} />,
  BALCONY: <GalleryHorizontal size={20} />,
};
