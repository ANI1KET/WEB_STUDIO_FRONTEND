"use client";

import {
  Path,
  FieldPath,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";
import React from "react";

import { cn } from "@/app/lib/utils";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

interface FormFieldProps<T extends FieldValues> {
  min?: number;
  max?: number;
  rows?: number;
  label: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  required?: boolean;
  name: FieldPath<T>;
  placeholder?: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  type?: "text" | "number" | "email" | "tel" | "textarea";
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function FormField<T extends FieldValues>({
  min,
  max,
  name,
  label,
  errors,
  rows = 3,
  onChange,
  register,
  maxLength,
  className,
  validation,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
}: FormFieldProps<T>) {
  const error = errors[name];
  const isTextarea = type === "textarea";

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const value = target.value;

    if (e.key === " " && value.trim().length === 0) {
      e.preventDefault(); // prevent leading spaces
    }

    if (isTextarea && e.key === "Enter") {
      e.preventDefault(); // Prevent newline insertion
    }
  };
  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={name} className="text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {isTextarea ? (
        <Textarea
          id={name}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          {...register(name, validation)}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className="text-sm border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md resize-none"
        />
      ) : (
        <Input
          id={name}
          min={min}
          max={max}
          type={type}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          {...register(name, validation)}
          onChange={onChange}
          className="h-9 text-sm border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md"
        />
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message as string}</p>
      )}
    </div>
  );
}
