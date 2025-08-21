"use client";

import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useToast } from "@/app/common/hooks/use-toast";
import { ServiceData } from "@/app/components/account/types/ListingServiceCard";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/app/components/ui/dialog";
import { PaymentInfo } from "./types/ScheduleVisitDialog";
import { BookingForm } from "./ScheduleVisitDialog/BookingForm";
import { ConfirmationScreen } from "./ScheduleVisitDialog/ConfirmationScreen";
import { ScheduleVisitHeader } from "./ScheduleVisitDialog/ScheduleVisitHeader";
import { serviceData } from "@/app/components/account/ServerAction/ListingServiceCard";

interface ScheduleVisitDialogProps {
  id: string;
  city: string;
  title: string;
  price: number;
  isOpen: boolean;
  location: string;
  listerName: string;
  onClose: () => void;
  primaryContact: string;
}

const ScheduleVisitDialog: React.FC<ScheduleVisitDialogProps> = ({
  // id,
  // city,
  // price,
  title,
  isOpen,
  onClose,
  // location,
  // listerName,
  // primaryContact,
}) => {
  const { toast } = useToast();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [visitType, setVisitType] = useState<"physical" | "virtual">(
    "physical"
  );
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cvv: "",
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
  });

  const { data, isLoading, isError } = useQuery<ServiceData>({
    queryKey: ["user_listing", "room"],
    queryFn: () => serviceData("room"),
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: isOpen,
  });

  if (isLoading) {
    return (
      <ScheduleVisitDialogSkeleton
        isOpen={isOpen}
        handleClose={() => onClose()}
      />
    );
  }
  if (isError) {
    return (
      <ScheduleVisitDialogError isOpen={isOpen} handleClose={() => onClose()} />
    );
  }
  if (!data) {
    return (
      <ScheduleVisitDialogNoData
        isOpen={isOpen}
        handleClose={() => onClose()}
      />
    );
  }

  const getVisitPrice = () => {
    return visitType === "virtual" ? data.virtualPrice : data.physicalPrice;
  };

  const handleSchedule = () => {
    if (
      selectedDate &&
      selectedTime &&
      paymentInfo.name &&
      paymentInfo.email &&
      paymentInfo.phone
    ) {
      setIsSubmitted(true);

      toast({
        title: `${
          visitType === "virtual" ? "Virtual" : "Physical"
        } Visit Scheduled Successfully! 🎉`,
        description: `Your ${visitType} appointment has been confirmed. You can now download the confirmation.`,
      });
    }
  };

  const handleDownloadConfirmation = () => {
    if (
      selectedDate &&
      selectedTime &&
      paymentInfo.name &&
      paymentInfo.email &&
      paymentInfo.phone
    ) {
      // generateVisitConfirmationPDF({
      //   roomTitle,
      //   date: selectedDate,
      //   time: selectedTime,
      //   visitPrice: getVisitPrice(),
      //   visitType,
      //   contactInfo: {
      //     name: paymentInfo.name,
      //     email: paymentInfo.email,
      //     phone: paymentInfo.phone,
      //   },
      //   // Add mock lister details for the PDF
      //   listerDetails: {
      //     name: "Property Owner",
      //     phone: "+91 98765 43210",
      //     email: "owner@example.com",
      //     address: "Property Location Address",
      //   },
      //   roomDetails: {
      //     type: "1 BHK Apartment",
      //     size: "650 sq ft",
      //     furnished: "Semi-Furnished",
      //     amenities: ["WiFi", "Parking", "Security", "Power Backup"],
      //   },
      // });

      toast({
        title: "Confirmation Downloaded! 📄",
        description: "Your visit confirmation has been saved as a PDF.",
      });
    }
  };

  const resetForm = () => {
    setPaymentInfo({
      cvv: "",
      name: "",
      email: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
    });
    setSelectedTime("");
    setIsSubmitted(false);
    setVisitType("physical");
    setSelectedDate(undefined);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isFormValid =
    selectedDate &&
    selectedTime &&
    paymentInfo.name &&
    paymentInfo.email &&
    paymentInfo.phone;
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        open={isOpen}
        onClose={handleClose}
        className="max-w-4xl w-[95vw] sm:w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto z-[9998] p-4 sm:p-6"
      >
        <DialogHeader className="space-y-3 sm:space-y-4">
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold text-gray-900">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>

            <span className="text-lg sm:text-2xl">
              {isSubmitted ? "Visit Confirmed!" : "Schedule Your Visit"}
            </span>
          </DialogTitle>

          <ScheduleVisitHeader
            roomTitle={title}
            visitType={visitType}
            visitPrice={getVisitPrice()}
          />
        </DialogHeader>

        {!isSubmitted ? (
          <BookingForm
            onClose={handleClose}
            visitType={visitType}
            paymentInfo={paymentInfo}
            isFormValid={!!isFormValid}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSchedule={handleSchedule}
            visitPrice={getVisitPrice()}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            onVisitTypeChange={setVisitType}
            onPaymentInfoChange={setPaymentInfo}
          />
        ) : (
          <ConfirmationScreen
            onClose={handleClose}
            visitType={visitType}
            paymentInfo={paymentInfo}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDownloadConfirmation={handleDownloadConfirmation}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleVisitDialog;

function ScheduleVisitDialogNoData({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        open={isOpen}
        onClose={handleClose}
        className="max-w-4xl w-[95vw] sm:w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto z-[9998] p-4 sm:p-6 flex items-center justify-center"
      >
        <p className="text-gray-700 text-base sm:text-lg text-center">
          This lister doesn&apos;t provide visit options.
        </p>
      </DialogContent>
    </Dialog>
  );
}

function ScheduleVisitDialogError({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        open={isOpen}
        onClose={handleClose}
        className="max-w-4xl w-[95vw] sm:w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto z-[9998] p-4 sm:p-6 flex items-center justify-center"
      >
        <p className="text-red-700 bg-red-100 border border-red-300 rounded-md p-4 text-base sm:text-lg text-center">
          Unable to load visit options. Please try again later.
        </p>
      </DialogContent>
    </Dialog>
  );
}

function ScheduleVisitDialogSkeleton({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        open={isOpen}
        onClose={handleClose}
        className="max-w-4xl w-[95vw] sm:w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto z-[9998] p-4 sm:p-6"
      >
        <div className="space-y-4 animate-pulse">
          {/* Header Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-200" />
            <div className="h-6 sm:h-8 w-2/3 bg-gray-200 rounded-md" />
          </div>

          {/* ScheduleVisitHeader-like section */}
          <div className="space-y-2 mt-2">
            <div className="h-4 w-1/3 bg-gray-200 rounded-md" />
            <div className="h-4 w-1/4 bg-gray-200 rounded-md" />
            <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
          </div>

          {/* Form fields */}
          <div className="space-y-4 mt-6">
            <div className="h-10 w-full bg-gray-200 rounded-md" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
            <div className="h-10 w-1/2 bg-gray-200 rounded-md" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
