"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/app/lib/utils";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange(event.target.checked);
    };

    return (
      <div
        className={cn("flex h-4 w-4 items-center justify-center", className)}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="peer h-4 w-4 opacity-0 absolute"
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 rounded-sm border border-gray-300 flex items-center justify-center",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-green-500 peer-focus-visible:ring-offset-2",
            checked ? "bg-green-600 border-transparent" : "bg-white"
          )}
        >
          {checked && <Check className="h-3 w-3 text-white" />}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
