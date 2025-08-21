"use client";

import { Session } from "next-auth";
import { Role } from "@prisma/client";
import React, { useState } from "react";
import { Calendar } from "lucide-react";

import { canAcessScheduleVisit } from "@/app/common/config/authorization";

import ContactCard from "./RoomDetailsAction/ContactCard";
import { Card, CardContent } from "@/app/components/ui/card";
import RoomStatusRow from "./RoomDetailsAction/RoomStatusRow";
import PriceActionCard from "./RoomDetailsAction/PriceActionCard";
import RoomTitleSection from "./RoomDetailsAction/RoomTitleSection";
import ScheduleVisitDialog from "./RoomDetailsAction/ScheduleVisitDialog";

interface RoomDetailsActionrProps {
  id: string;
  city: string;
  title: string;
  price: number;
  postedBy: Role;
  ratings: number;
  location: string;
  listerId: string;
  verified: boolean;
  available: boolean;
  listerName: string;
  onShare: () => void;
  onCompare: () => void;
  primaryContact: string;
  session: Session | null;
  secondaryContact: string;
  onInterest: () => Promise<void>;
  generateOtp: (phoneNumber: string) => Promise<void>;
  verifyContact: (phoneNumber: string, otp: string) => Promise<boolean>;
}

const RoomDetailsAction: React.FC<RoomDetailsActionrProps> = ({
  id,
  city,
  title,
  price,
  session,
  onShare,
  ratings,
  verified,
  postedBy,
  location,
  available,
  onCompare,
  listerName,
  onInterest,
  generateOtp,
  verifyContact,
  primaryContact,
  // secondaryContact,
}) => {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <RoomTitleSection title={title} location={location} city={city} />

            <RoomStatusRow
              ratings={ratings}
              verified={verified}
              available={available}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContactCard title="Contact" contactNumber={primaryContact} />

            {/* <ContactCard title="Owner Contact" contactNumber={ownerContact} /> */}

            {canAcessScheduleVisit(postedBy, available) && (
              <div className="flex items-start justify-between bg-white rounded-xl p-4 border border-gray-200/80 transition-all duration-300 hover:shadow-lg hover:border-green-200 hover:-translate-y-1">
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Schedule Visit
                  </p>

                  <p className="w-full flex gap-4">
                    <span className="font-semibold text-gray-800 text-xs bg-green-500/30 px-2 py-1 rounded-full">
                      Physical
                    </span>

                    <span className="font-semibold text-gray-800 text-xs bg-green-500/30 px-2 py-1 rounded-full">
                      Virtual
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <Calendar
                    onClick={() => setIsScheduleDialogOpen(true)}
                    className="h-4 w-4 text-green-600 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <PriceActionCard
          price={price}
          session={session}
          onShare={onShare}
          onCompare={onCompare}
          generateOtp={generateOtp}
          onShowInterest={onInterest}
          verifyContact={verifyContact}
        />
      </CardContent>

      <ScheduleVisitDialog
        id={id}
        city={city}
        title={title}
        price={price}
        location={location}
        listerName={listerName}
        isOpen={isScheduleDialogOpen}
        primaryContact={primaryContact}
        onClose={() => setIsScheduleDialogOpen(false)}
      />
    </Card>
  );
};

export default React.memo(RoomDetailsAction);
