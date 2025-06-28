"use client";

import {
  Bed,
  Apartment,
  ShoppingBag,
  DirectionsCar,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/app/common/hooks/use-mobile";

import CategoryCard from "./CategoryItem/CategoryCard";

type CategoryItemProps = {
  title: string;
  route: string;
  bgImage: string;
  description: string;
  iconType: "bed" | "apartment" | "car" | "shopping";
};

const CategoryItem = ({
  title,
  route,
  bgImage,
  iconType,
  description,
}: CategoryItemProps) => {
  const router = useRouter();
  // Use the useIsMobile hook instead of direct window access
  const isMobile = useIsMobile();

  // Convert iconType to the actual React node
  const getIcon = (type: string, fontSize: number) => {
    switch (type) {
      case "bed":
        return <Bed sx={{ fontSize, color: "white" }} />;
      case "apartment":
        return <Apartment sx={{ fontSize, color: "white" }} />;
      case "car":
        return <DirectionsCar sx={{ fontSize, color: "white" }} />;
      case "shopping":
        return <ShoppingBag sx={{ fontSize, color: "white" }} />;
      default:
        return <Bed sx={{ fontSize, color: "white" }} />;
    }
  };

  // Determine fontSize based on screen size
  const fontSize = isMobile ? 24 : 32;

  const icon = getIcon(iconType, fontSize);

  return (
    <div className="transform transition-all duration-500 hover:scale-105">
      <Box
        sx={{
          position: "relative",
          transition: "all 0.5s ease",
          transform: "perspective(1000px)",
          "&:hover": {
            transform: "perspective(1000px) rotateY(5deg)",
          },
        }}
      >
        <CategoryCard
          icon={icon}
          title={title}
          bgImage={bgImage}
          description={description}
          onExplore={() => router.push(route)}
        />
      </Box>
    </div>
  );
};

export default CategoryItem;
