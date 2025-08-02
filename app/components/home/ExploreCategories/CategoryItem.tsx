"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { Package, HandHeart, Truck, Wrench } from "lucide-react";

import { useIsMobile } from "@/app/common/hooks/use-mobile";

import CategoryCard from "./CategoryItem/CategoryCard";

type CategoryItemProps = {
  title: string;
  route: string;
  bgImage: string;
  description: string;
  iconType: "package" | "hand-heart" | "truck" | "wrench";
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
    const iconProps = {
      size: fontSize,
      color: "white",
      strokeWidth: 2,
    };

    switch (type) {
      case "package":
        return <Package {...iconProps} />;
      case "hand-heart":
        return <HandHeart {...iconProps} />;
      case "truck":
        return <Truck {...iconProps} />;
      case "wrench":
        return <Wrench {...iconProps} />;
      default:
        return <Package {...iconProps} />;
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
