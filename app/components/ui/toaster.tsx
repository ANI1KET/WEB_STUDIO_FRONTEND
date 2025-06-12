"use client";

import { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";

import { useToast } from "@/app/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();
  const [openToasts, setOpenToasts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Set newly added toasts as open
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

  return (
    <>
      {toasts.map(({ id, title, description, action, variant }) => (
        <Snackbar
          key={id}
          autoHideDuration={3000}
          open={openToasts[id] || false}
          onClose={() => handleClose(id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={variant === "destructive" ? "error" : "info"}
            className="w-full"
            action={action}
          >
            {title && <div className="font-semibold">{title}</div>}
            {description && (
              <div className="text-sm opacity-90">{description}</div>
            )}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
