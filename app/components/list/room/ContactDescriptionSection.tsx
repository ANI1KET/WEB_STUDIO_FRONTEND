"use client";

import React from "react";
import { FileText } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { RoomWithMedia } from "@/app/types/types";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import { FormField } from "@/app/components/ui/form-field";

interface ContactDescriptionSectionProps {
  errors: FieldErrors<RoomWithMedia>;
  register: UseFormRegister<RoomWithMedia>;
}

const ContactDescriptionSection: React.FC<ContactDescriptionSectionProps> = ({
  errors,
  register,
}) => {
  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg py-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5" />
          Contact & Description
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            required
            type="tel"
            maxLength={10}
            errors={errors}
            register={register}
            name="primaryContact"
            label="Primary Contact"
            placeholder="9812345678"
            validation={{
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Owner Contact must be exactly 10 digits",
              },
              required: "Primary Contact is required",
            }}
          />

          <FormField
            required
            type="tel"
            maxLength={10}
            errors={errors}
            register={register}
            name="secondaryContact"
            label="Secondary Contact"
            placeholder="9812345678"
            validation={{
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Owner Contact must be exactly 10 digits",
              },
              required: "Owner Contact is required",
            }}
          />
        </div>

        <FormField
          required
          rows={2}
          errors={errors}
          maxLength={500}
          type="textarea"
          name="description"
          register={register}
          label={`Description`}
          validation={{
            required: "Description is required",
          }}
          placeholder="Describe your room, nearby facilities, rules, etc."
        />
      </CardContent>
    </Card>
  );
};

export default ContactDescriptionSection;
