"use client";

import React from "react";
import { Session } from "next-auth";

import ContactCard from "./RoomDetailsHeader/ContactCard";
import { Card, CardContent } from "@/app/components/ui/card";
import RoomStatusRow from "./RoomDetailsHeader/RoomStatusRow";
import PriceActionCard from "./RoomDetailsHeader/PriceActionCard";
import RoomTitleSection from "./RoomDetailsHeader/RoomTitleSection";

interface RoomDetailsActionrProps {
  name: string;
  city: string;
  price: number;
  ratings: number;
  location: string;
  verified: boolean;
  available: boolean;
  onShare: () => void;
  ownerContact: string;
  onCompare: () => void;
  primaryContact: string;
  onInterest: () => void;
  session: Session | null;
  verifyContact: (phoneNumber: string) => Promise<void>;
}

const RoomDetailsAction: React.FC<RoomDetailsActionrProps> = ({
  name,
  city,
  price,
  session,
  onShare,
  ratings,
  verified,
  location,
  available,
  onCompare,
  onInterest,
  verifyContact,
  // ownerContact,
  primaryContact,
}) => {
  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <RoomTitleSection name={name} location={location} city={city} />

              <RoomStatusRow
                ratings={ratings}
                verified={verified}
                available={available}
              />
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactCard title="Contact" contactNumber={primaryContact} />

              {/* <ContactCard title="Owner Contact" contactNumber={ownerContact} /> */}
            </div>
          </div>

          {/* Price Action Card */}
          <PriceActionCard
            price={price}
            session={session}
            onShare={onShare}
            onCompare={onCompare}
            onShowInterest={onInterest}
            verifyContact={verifyContact}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(RoomDetailsAction);
