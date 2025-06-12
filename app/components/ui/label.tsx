"use client";

import * as React from "react";
import { FormLabel, FormLabelProps } from "@mui/material";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils";

const labelVariants = cva(
  "text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

interface LabelProps
  extends Omit<FormLabelProps, "className">,
    VariantProps<typeof labelVariants> {
  className?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <FormLabel
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
