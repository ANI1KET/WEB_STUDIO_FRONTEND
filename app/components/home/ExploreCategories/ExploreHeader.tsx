"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

const ExploreHeader = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: { xs: 4, md: 6 },
        p: { xs: 2, sm: 3, md: 5 },
        transition: "all 0.5s ease",
        backdropFilter: "blur(8px)",
        borderRadius: { xs: 2, md: 4 },
        bgcolor: "rgba(255,255,255,0.2)",
        border: "1px solid rgba(255,255,255,0.2)",
        transform: "perspective(1000px) rotateX(1deg)",
        "&:hover": {
          transform: "perspective(1000px) rotateX(0deg)",
        },
      }}
    >
      <Typography
        mb={1.5}
        variant="h3"
        component="h2"
        fontWeight="bold"
        sx={{
          color: "white",
          "& span": { color: "#59b31d" },
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.5rem" },
        }}
      >
        Explore <span>AfnoSansaar</span>
      </Typography>
      <Typography
        mb={4}
        variant="h6"
        color="rgba(255,255,255,0.9)"
        sx={{
          mx: "auto",
          maxWidth: "600px",
          px: { xs: 1, sm: 0 },
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          fontSize: { xs: "0.875rem", sm: "0.9rem", md: "1.25rem" },
        }}
      >
        Discover the perfect spaces and items for your needs in Nepal, from cozy
        rooms to spacious properties
      </Typography>
    </Box>
  );
};

export default ExploreHeader;
