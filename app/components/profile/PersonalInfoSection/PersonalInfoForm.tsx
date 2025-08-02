"use client";

import React from "react";
import { Mail, Phone, User } from "lucide-react";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

interface PersonalInfoFormProps {
  isEditing: boolean;
  phoneNumber: string | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  onFormChange: (field: "email" | "phoneNumber", value: string) => void;
}

const PersonalInfoForm = ({
  name,
  email,
  isEditing,
  phoneNumber,
  onFormChange,
}: PersonalInfoFormProps) => {
  return (
    <div className="flex-1 space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-semibold flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Full Name
          </Label>

          <Input
            id="name"
            disabled={true}
            value={name ?? ""}
            className="bg-green-50 border-green-200 h-10"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-semibold flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Email Address
          </Label>

          <Input
            id="email"
            type="email"
            value={email ?? ""}
            disabled={!isEditing}
            onChange={(e) => onFormChange("email", e.target.value)}
            className="h-10 border-green-200 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="phone"
          className="text-sm font-semibold text-green-700 flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Phone Number
        </Label>

        <Input
          id="phone"
          type="tel"
          maxLength={10}
          pattern="\d{10}"
          disabled={!isEditing}
          value={phoneNumber ?? ""}
          placeholder="Enter your phone number"
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
              onFormChange("phoneNumber", value);
            }
          }}
          className="h-10 border-green-200 focus:border-green-500 focus:ring-green-500"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
