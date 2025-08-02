"use client";

import React from "react";
import { CreditCard } from "lucide-react";

import { PaymentInfo } from "../config/ScheduleVisitDialog";

import { Button } from "@/app/components/ui/button";
import { StatusAlert } from "./BookingForm/StatusAlert";
import { DialogFooter } from "@/app/components/ui/dialog";
import { VisitBenefits } from "./BookingForm/VisitBenefits";
import { PaymentSummary } from "./BookingForm/PaymentSummary";
import { DateTimeSelection } from "./BookingForm/DateTimeSelection";
import { ContactInformation } from "./BookingForm/ContactInformation";
import { VisitTypeSelection } from "./BookingForm/VisitTypeSelection";

interface BookingFormProps {
  visitPrice: number;
  selectedDate?: Date;
  selectedTime: string;
  paymentInfo: {
    cvv: string;
    name: string;
    email: string;
    phone: string;
    cardNumber: string;
    expiryDate: string;
  };
  onClose: () => void;
  isFormValid: boolean;
  onSchedule: () => void;
  visitType: "physical" | "virtual";
  onTimeSelect: (time: string) => void;
  onDateSelect: (date: Date | undefined) => void;
  onVisitTypeChange: (type: "physical" | "virtual") => void;
  onPaymentInfoChange: React.Dispatch<React.SetStateAction<PaymentInfo>>;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onClose,
  visitType,
  onSchedule,
  visitPrice,
  isFormValid,
  paymentInfo,
  selectedTime,
  selectedDate,
  onDateSelect,
  onTimeSelect,
  onVisitTypeChange,
  onPaymentInfoChange,
}) => {
  return (
    <>
      <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
        <VisitTypeSelection
          visitType={visitType}
          onVisitTypeChange={onVisitTypeChange}
        />

        <VisitBenefits visitType={visitType} />

        <DateTimeSelection
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateSelect={onDateSelect}
          onTimeSelect={onTimeSelect}
        />

        <StatusAlert selectedDate={selectedDate} selectedTime={selectedTime} />

        <ContactInformation
          paymentInfo={paymentInfo}
          onPaymentInfoChange={onPaymentInfoChange}
        />

        <PaymentSummary visitPrice={visitPrice} visitType={visitType} />
      </div>

      <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-0">
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full sm:w-auto px-6 sm:px-8 order-2 sm:order-1"
        >
          Cancel
        </Button>

        <Button
          onClick={onSchedule}
          disabled={!isFormValid}
          className="w-full sm:w-auto px-6 sm:px-8 bg-green-600 hover:bg-green-700 disabled:opacity-50 order-1 sm:order-2"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          <span className="text-sm sm:text-base">
            Pay ₹{visitPrice} & Schedule{" "}
            {visitType === "virtual" ? "Virtual" : "Physical"} Visit
          </span>
        </Button>
      </DialogFooter>
    </>
  );
};
