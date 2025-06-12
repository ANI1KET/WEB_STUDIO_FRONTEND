"use client";

import {
  Box,
  Card,
  Button,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { ArrowForward as ArrowRightIcon } from "@mui/icons-material";

interface CategoryCardProps {
  title: string;
  bgImage: string;
  description: string;
  icon: React.ReactNode;
  onExplore?: () => void;
}

const CategoryCard = ({
  icon,
  title,
  bgImage,
  onExplore,
  description,
}: CategoryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center as a percentage of width/height
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <Card
        sx={{
          height: "24rem",
          overflow: "hidden",
          position: "relative",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: isHovering
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          "&:hover": {
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <CardMedia
          alt={title}
          loading="lazy"
          component="img"
          image={bgImage}
          sx={{
            top: 0,
            left: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />

        {/* Overlay gradient */}
        <Box
          sx={{
            top: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
            background:
              "linear-gradient(to top, rgba(0,75,0,0.8) 0%, rgba(0,75,0,0.3) 100%)",
          }}
        />

        <CardContent
          sx={{
            zIndex: 2,
            padding: 3,
            color: "white",
            height: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              mb: 3,
              p: 2.5,
              display: "flex",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              backdropFilter: "blur(8px)",
              background: "rgba(16, 122, 16, 0.4)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              "&:hover": {
                transform: "scale(1.1)",
                background: "rgba(16, 122, 16, 0.6)",
              },
            }}
          >
            {icon}
          </Box>

          <Typography variant="h5" component="h3" fontWeight="bold" mb={1}>
            {title}
          </Typography>

          <Typography
            mb={3}
            variant="body1"
            textAlign="center"
            sx={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
          >
            {description}
          </Typography>

          <Button
            variant="outlined"
            onClick={onExplore}
            endIcon={<ArrowRightIcon />}
            sx={{
              color: "white",
              backdropFilter: "blur(5px)",
              borderColor: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.1)",
              "&:hover": {
                color: "green",
                background: "white",
                borderColor: "white",
              },
              mt: 2,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.3s ease",
              ".MuiCard-root:hover &": {
                opacity: 1,
                transform: "translateY(0)",
              },
            }}
          >
            Explore Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryCard;
