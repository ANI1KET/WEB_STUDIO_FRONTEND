"use client";

import React from "react";
import { format } from "date-fns";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/app/components/ui/alert";

interface StatusAlertProps {
  selectedDate?: Date;
  selectedTime: string;
}

export const StatusAlert: React.FC<StatusAlertProps> = ({
  selectedDate,
  selectedTime,
}) => {
  if (selectedDate && selectedTime) {
    return (
      <Alert className="border-green-200 bg-green-50 animate-fade-in">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertDescription className="text-green-800 font-medium">
          Visit scheduled for {format(selectedDate, "EEEE, MMMM dd")} at{" "}
          {selectedTime}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-amber-200 bg-amber-50">
      <AlertCircle className="h-5 w-5 text-amber-600" />
      <AlertDescription className="text-amber-800">
        Please fill in all required fields to proceed with scheduling.
      </AlertDescription>
    </Alert>
  );
};
