"use client";

import React from "react";
import { Video, MapPin, Download } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { DialogFooter } from "@/app/components/ui/dialog";

interface ConfirmationScreenProps {
  paymentInfo: {
    name: string;
    email: string;
    phone: string;
  };
  selectedDate?: Date;
  onClose: () => void;
  selectedTime: string;
  visitType: "physical" | "virtual";
  onDownloadConfirmation: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  onClose,
  visitType,
  paymentInfo,
  selectedDate,
  selectedTime,
  onDownloadConfirmation,
}) => {
  return (
    <>
      <div className="space-y-4 sm:space-y-6 py-2 sm:py-4 text-center">
        <div className="p-4 sm:p-6 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-center mb-3">
            {visitType === "virtual" ? (
              <Video className="w-8 h-8 text-green-600" />
            ) : (
              <MapPin className="w-8 h-8 text-green-600" />
            )}
          </div>

          <h3 className="text-lg sm:text-lg font-semibold text-green-900 mb-2">
            Your {visitType} visit has been successfully scheduled!
          </h3>

          <p className="text-sm sm:text-base text-green-700 mb-4">
            Visit Date:{" "}
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at {selectedTime}
          </p>

          <p className="text-xs sm:text-sm text-green-600">
            A confirmation email has been sent to {paymentInfo.email}
            {visitType === "virtual" && (
              <span className="block mt-1">
                Virtual meeting link will be shared 1 hour before the visit
              </span>
            )}
          </p>
        </div>
      </div>

      <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-0">
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full sm:w-auto px-6 sm:px-8 order-2 sm:order-1"
        >
          Close
        </Button>

        <Button
          onClick={onDownloadConfirmation}
          className="w-full sm:w-auto px-6 sm:px-8 bg-green-600 hover:bg-green-700 order-1 sm:order-2"
        >
          <Download className="mr-2 h-4 w-4" />
          <span className="text-sm sm:text-base">Download Confirmation</span>
        </Button>
      </DialogFooter>
    </>
  );
};
