"use client";

import React from "react";
import { User } from "lucide-react";

import { PaymentInfo } from "../../types/ScheduleVisitDialog";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";

interface ContactInformationProps {
  paymentInfo: {
    cvv: string;
    name: string;
    email: string;
    phone: string;
    cardNumber: string;
    expiryDate: string;
  };
  onPaymentInfoChange: React.Dispatch<React.SetStateAction<PaymentInfo>>;
}

export const ContactInformation: React.FC<ContactInformationProps> = ({
  paymentInfo,
  onPaymentInfoChange,
}) => {
  const handleInputChange = (field: keyof PaymentInfo, value: string) => {
    onPaymentInfoChange((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <User className="h-5 w-5 text-green-600" />
          Your Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>

            <Input
              id="name"
              className="h-10"
              value={paymentInfo.name}
              placeholder="Enter your full name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>

            <Input
              id="phone"
              className="h-10"
              value={paymentInfo.phone}
              placeholder="Enter your phone number"
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>

          <Input
            id="email"
            type="email"
            value={paymentInfo.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email address"
            className="h-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};
