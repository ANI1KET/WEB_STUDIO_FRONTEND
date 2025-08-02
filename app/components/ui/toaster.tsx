"use client";

import {
  Box,
  Slide,
  Snackbar,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useToast } from "@/app/common/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();
  const [openToasts, setOpenToasts] = useState<Record<string, boolean>>({});

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const newOpenToasts = { ...openToasts };
    toasts.forEach((toast) => {
      if (toast.open !== false && !openToasts[toast.id]) {
        newOpenToasts[toast.id] = true;
      }
    });
    if (Object.keys(newOpenToasts).length !== Object.keys(openToasts).length) {
      setOpenToasts(newOpenToasts);
    }
  }, [toasts, openToasts]);

  const handleClose = (id: string) => {
    setOpenToasts((prev) => ({ ...prev, [id]: false }));
    const toast = toasts.find((t) => t.id === id);
    if (toast && toast.onOpenChange) {
      toast.onOpenChange(false);
    }
  };

  const getToastStyle = (variant: string) => {
    if (variant === "destructive") {
      return {
        color: "#611a15",
        borderColor: "#f5c6cb",
        backgroundColor: "#fdecea",
        icon: <ErrorIcon sx={{ color: "#d32f2f", mr: 1 }} />,
      };
    } else {
      return {
        color: "#1e4620",
        borderColor: "#c8e6c9",
        backgroundColor: "#edf7ed",
        icon: <CheckCircleIcon sx={{ color: "#388e3c", mr: 1 }} />,
      };
    }
  };

  const getToastWidth = () => {
    if (isMobile) return "90vw";
    if (isTablet) return "60vw";
    return 400;
  };

  return (
    <>
      {toasts.map(({ id, title, description, action, variant }) => {
        const { backgroundColor, borderColor, color, icon } = getToastStyle(
          variant || "default"
        );

        return (
          <Snackbar
            key={id}
            autoHideDuration={3000}
            open={openToasts[id] || false}
            onClose={() => handleClose(id)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            slots={{
              transition: (props) => <Slide {...props} direction="left" />,
            }}
            sx={{ mb: 2 }}
          >
            <Box
              sx={{
                color,
                px: 2,
                py: 1.5,
                minWidth: 280,
                borderRadius: 2,
                backgroundColor,
                display: "flex",
                maxWidth: "95vw",
                alignItems: "center",
                width: getToastWidth(),
                borderLeft: `6px solid ${borderColor}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              {icon}
              <Box sx={{ flex: 1 }}>
                {title && (
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    {title}
                  </Typography>
                )}
                {description && (
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {description}
                  </Typography>
                )}
              </Box>
              {action ?? (
                <IconButton
                  size="small"
                  aria-label="close"
                  onClick={() => handleClose(id)}
                  sx={{
                    ml: 1,
                    color,
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "scale(1.2)", color: "black" },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Snackbar>
        );
      })}
    </>
  );
}
