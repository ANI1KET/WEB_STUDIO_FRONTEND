"use client";

import React from "react";
import { CreditCard, Video, MapPin, Percent } from "lucide-react";

import { Card, CardContent } from "@/app/components/ui/card";

interface PaymentSummaryProps {
  visitPrice: number;
  visitType?: "physical" | "virtual";
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  visitPrice,
  visitType = "physical",
}) => {
  const originalPrice =
    visitType === "virtual" ? Math.round(visitPrice / 0.3) : visitPrice;
  const discount = visitType === "virtual" ? originalPrice - visitPrice : 0;

  return (
    <Card
      className={`${
        visitType === "physical"
          ? "border-green-200 bg-green-50"
          : "border-blue-200 bg-blue-50"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`p-2 rounded-lg ${
              visitType === "physical" ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            <CreditCard className="h-5 w-5 text-white" />
          </div>

          <h4
            className={`font-semibold text-lg ${
              visitType === "physical" ? "text-green-900" : "text-blue-900"
            }`}
          >
            Payment Summary
          </h4>
        </div>

        <div className="space-y-3">
          {visitType === "virtual" && (
            <>
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Physical Visit Price</span>
                </div>
                <span className="line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-green-600">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  <span>Virtual Visit Discount (70%)</span>
                </div>
                <span>-₹{discount.toLocaleString()}</span>
              </div>

              <hr className="border-gray-200" />
            </>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {visitType === "physical" ? (
                <MapPin className={`h-5 w-5 text-green-600`} />
              ) : (
                <Video className={`h-5 w-5 text-blue-600`} />
              )}
              <span
                className={`font-semibold ${
                  visitType === "physical" ? "text-green-900" : "text-blue-900"
                }`}
              >
                {visitType === "physical" ? "Physical" : "Virtual"} Visit Fee
              </span>
            </div>

            <span
              className={`text-2xl font-bold ${
                visitType === "physical" ? "text-green-600" : "text-blue-600"
              }`}
            >
              ₹{visitPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <div
          className={`mt-4 p-3 rounded-lg ${
            visitType === "physical"
              ? "bg-green-100 border border-green-200"
              : "bg-blue-100 border border-blue-200"
          }`}
        >
          <p
            className={`text-sm ${
              visitType === "physical" ? "text-green-700" : "text-blue-700"
            }`}
          >
            <strong>What&apos;s included:</strong>{" "}
            {visitType === "physical"
              ? "Complete room inspection, appliance testing, neighborhood guidance, and instant booking option"
              : "HD live video tour, real-time Q&A, virtual room walkthrough, and digital documentation"}
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Payment will be processed securely upon confirmation
        </p>
      </CardContent>
    </Card>
  );
};
