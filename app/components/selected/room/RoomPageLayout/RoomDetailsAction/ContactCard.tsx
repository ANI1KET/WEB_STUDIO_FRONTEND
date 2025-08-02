"use client";

import React from "react";
import { Phone } from "lucide-react";

interface ContactCardProps {
  title: string;
  contactNumber: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, contactNumber }) => {
  const handleCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  return (
    <div className="flex items-start justify-between bg-white rounded-xl p-4 border border-gray-200/80 transition-all duration-300 hover:shadow-lg hover:border-green-200 hover:-translate-y-1">
      <div>
        <p className="text-xs text-gray-500 font-medium">{title}</p>
        <p className="font-semibold text-gray-800 text-base">{contactNumber}</p>
      </div>
      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
        <Phone
          onClick={() => handleCall(contactNumber)}
          className="h-4 w-4 text-green-600 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ContactCard;
