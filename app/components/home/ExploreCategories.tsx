"use client";

import dynamic from "next/dynamic";
import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";

import {
  storeDeliveryImages,
  onDemandHelpersImages,
  shiftingServiceImages,
  assistanceServiceImages,
} from "./config/ExploreCategories";

const ExploreHeader = dynamic(
  () => import("./ExploreCategories/ExploreHeader")
);
const CategoryItem = dynamic(() => import("./ExploreCategories/CategoryItem"));

const ExploreCategories = () => {
  const [activeImageIndex, setActiveImageIndex] = useState({
    shifting: 0,
    onDemand: 0,
    assistance: 0,
    storeDelivery: 0,
  });

  // Set up image cycling for each category
  useEffect(() => {
    const imageCycleInterval = setInterval(() => {
      setActiveImageIndex((prev) => ({
        shifting: (prev.shifting + 1) % shiftingServiceImages.length,
        onDemand: (prev.onDemand + 1) % onDemandHelpersImages.length,
        assistance: (prev.assistance + 1) % assistanceServiceImages.length,
        storeDelivery: (prev.storeDelivery + 1) % storeDeliveryImages.length,
      }));
    }, 3000);

    return () => clearInterval(imageCycleInterval);
  }, []);

  const categories = [
    {
      route: "/listers",
      iconType: "hand-heart" as const,
      title: "Relocation & Property Services",
      bgImage: assistanceServiceImages[activeImageIndex.assistance],
      description: "Complete support for moving and finding properties",
    },
    {
      route: "/shifters",
      iconType: "package" as const,
      title: "Complete Shifting Solutions",
      bgImage: shiftingServiceImages[activeImageIndex.shifting],
      description: "Full-service moving for homes, offices & more",
    },
    {
      route: "/doorstep",
      iconType: "truck" as const,
      title: "Store-to-Door Delivery",
      bgImage: storeDeliveryImages[activeImageIndex.storeDelivery],
      description: "Seamless delivery from store to your doorstep",
    },
    {
      route: "/helpers",
      title: "On-Demand Helpers",
      iconType: "wrench" as const,
      description: "Quick help for moving & home tasks",
      bgImage: onDemandHelpersImages[activeImageIndex.onDemand],
    },
  ];

  return (
    <Container maxWidth="lg" className="py-8">
      <ExploreHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            title={category.title}
            route={category.route}
            bgImage={category.bgImage}
            iconType={category.iconType}
            description={category.description}
          />
        ))}
      </div>
    </Container>
  );
};

export default ExploreCategories;
