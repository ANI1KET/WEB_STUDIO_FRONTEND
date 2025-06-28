// "use client";

// import React from "react";
// import { Box, Container, BoxProps } from "@mui/material";

// interface BackgroundSectionProps extends BoxProps {
//   blurAmount: number;
//   overlayColor?: string;
//   backgroundImage: string;
//   children: React.ReactNode;
//   containerMaxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
// }

// const BackgroundSection = ({
//   sx,
//   children,
//   blurAmount,
//   backgroundImage,
//   containerMaxWidth = "lg",
//   overlayColor = "rgba(0,0,0,0.6)",
//   ...props
// }: BackgroundSectionProps) => {
//   return (
//     <Box
//       component="section"
//       sx={{
//         py: 8,
//         px: 2,
//         position: "relative",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         backgroundImage: `url('${backgroundImage}')`,
//         ...sx,
//       }}
//       {...props}
//     >
//       {/* Overlay with optional blur */}
//       <Box
//         sx={{
//           inset: 0,
//           zIndex: 0,
//           position: "absolute",
//           bgcolor: overlayColor,
//           backdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none",
//         }}
//       />

//       {/* Content container */}
//       <Container
//         maxWidth={containerMaxWidth}
//         sx={{
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {children}
//       </Container>
//     </Box>
//   );
// };

// export default BackgroundSection;

"use client";

import React from "react";
import { Box, Container, BoxProps } from "@mui/material";

interface BackgroundSectionProps extends BoxProps {
  blurAmount: number;
  overlayColor?: string;
  children: React.ReactNode;
  containerMaxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

const BackgroundSection = ({
  sx,
  children,
  blurAmount,
  containerMaxWidth = "lg",
  overlayColor = "rgba(0,0,0,0.6)",
  ...props
}: BackgroundSectionProps) => {
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        px: 2,
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        ...sx,
      }}
      {...props}
    >
      {/* Overlay with optional blur */}
      <Box
        sx={{
          inset: 0,
          zIndex: 0,
          position: "absolute",
          bgcolor: overlayColor,
          backdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none",
        }}
      />

      {/* Content container */}
      <Container
        maxWidth={containerMaxWidth}
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default BackgroundSection;
