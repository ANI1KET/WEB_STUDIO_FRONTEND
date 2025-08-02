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
        bgcolor: "rgba(255, 255, 255, 0.4)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transform: "perspective(1000px) rotateX(1deg)",
        "&:hover": {
          transform: "perspective(1000px) rotateX(0deg)",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Typography
        mb={1.5}
        variant="h3"
        component="h2"
        fontWeight="bold"
        sx={{
          color: "green",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.5rem" },
        }}
      >
        Explore AfnoSansaar Services
      </Typography>
      <Typography
        mb={4}
        variant="h6"
        color="#065f46"
        sx={{
          mx: "auto",
          maxWidth: "600px",
          px: { xs: 1, sm: 0 },
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          fontSize: { xs: "0.875rem", sm: "0.9rem", md: "1.25rem" },
        }}
      >
        Your complete moving and delivery solution in Nepal - from professional
        shifting services to on-demand help
      </Typography>
    </Box>
  );
};

export default ExploreHeader;
