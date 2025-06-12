"use client";

import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";

import {
  roomImages,
  vehicleImages,
  preownedImages,
  propertyImages,
} from "./config/ExploreCategories";

import CategoryItem from "./ExploreCategories/CategoryItem";
import ExploreHeader from "./ExploreCategories/ExploreHeader";
import BackgroundSection from "./ExploreCategories/BackgroundSection";

const ExploreCategories = () => {
  const [activeImageIndex, setActiveImageIndex] = useState({
    rooms: 0,
    vehicles: 0,
    preowned: 0,
    properties: 0,
  });

  // Set up image cycling for each category
  useEffect(() => {
    const imageCycleInterval = setInterval(() => {
      setActiveImageIndex((prev) => ({
        rooms: (prev.rooms + 1) % roomImages.length,
        vehicles: (prev.vehicles + 1) % vehicleImages.length,
        preowned: (prev.preowned + 1) % preownedImages.length,
        properties: (prev.properties + 1) % propertyImages.length,
      }));
    }, 3000);

    return () => clearInterval(imageCycleInterval);
  }, []);

  const categories = [
    {
      title: "Rooms",
      route: "/explore/rooms",
      iconType: "bed" as const,
      bgImage: roomImages[activeImageIndex.rooms],
      description: "Find the perfect room for your stay in Nepal",
    },
    {
      title: "Properties",
      route: "/explore/properties",
      iconType: "apartment" as const,
      bgImage: propertyImages[activeImageIndex.properties],
      description: "Discover your dream home or land in Nepal",
    },
    {
      title: "Vehicles",
      iconType: "car" as const,
      route: "/explore/vehicles",
      bgImage: vehicleImages[activeImageIndex.vehicles],
      description: "Browse quality vehicles for sale across Nepal",
    },
    {
      title: "Pre-owned Items",
      iconType: "shopping" as const,
      route: "/explore/reMarketItem",
      bgImage: preownedImages[activeImageIndex.preowned],
      description: "Shop for pre-owned items at great prices in Nepal",
    },
  ];

  return (
    <BackgroundSection
      blurAmount={1.5}
      overlayColor="rgba(0,0,0,0.6)"
      backgroundImage="/bg_images/image_2.jpg"
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 1, sm: 2, md: 2 },
        transition: "all 0.5s ease",
        "&:hover": {
          "&::before": {
            transform: "scale(1.05)",
          },
        },
        "&::before": {
          transformOrigin: "center",
          transition: "transform 0.5s ease",
        },
      }}
    >
      <Container maxWidth="lg">
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
    </BackgroundSection>
  );
};

export default ExploreCategories;
