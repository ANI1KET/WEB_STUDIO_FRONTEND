"use client";

import {
  Info,
  Star,
  Home,
  User,
  Phone,
  Camera,
  Download,
  CheckCircle,
} from "lucide-react";
import React, { useRef } from "react";
import html2canvas from "html2canvas";

import { useToast } from "@/app/common/hooks/use-toast";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

interface RequiredInfoGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequiredInfoGuide: React.FC<RequiredInfoGuideProps> = ({
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);

  const requiredSections = [
    {
      title: "Basic Information",
      icon: <Home className="h-5 w-5" />,
      color: "from-blue-500 to-blue-600",
      items: [
        "Room Title (e.g., 2BHK in Thamel with Parking)",
        "City (Select from list or add custom)",
        "Specific Location (Ward, nearby landmarks)",
        "Room Type (FLAT, 1BHK, 2BHK, 3BHK, 4BHK)",
      ],
    },
    {
      title: "Room Details",
      icon: <Home className="h-5 w-5" />,
      color: "from-green-500 to-green-600",
      items: [
        "Number of Bedrooms",
        "Number of Halls",
        "Number of Kitchens",
        "Number of Bathrooms",
        "Price (Rs.25,000/month)",
        "Minimum Capacity (people)",
        "Maximum Capacity (people)",
        "Direction (North, South, East, West)",
      ],
    },
    {
      title: "Amenities & Furnishing",
      icon: <Star className="h-5 w-5" />,
      color: "from-purple-500 to-purple-600",
      items: [
        "Amenities (WiFi, Parking, Garden, AC, Terrace, etc.)",
        "Furnishing Status (Fully Furnished, Semi Furnished, Unfurnished)",
        "Select all applicable amenities from the list",
      ],
    },
    {
      title: "Contact & Description",
      icon: <Phone className="h-5 w-5" />,
      color: "from-orange-500 to-orange-600",
      items: [
        "Primary Contact Number (for direct inquiries)",
        "Secondary Contact (e.g., owner's contact if listed by broker)",
        "Comprehensive Room Overview (highlight key features, layout, and style)",
      ],
    },
    {
      title: "Owner Details (If You Are Not the Owner)",
      icon: <User className="h-5 w-5" />,
      color: "from-red-500 to-red-600",
      items: ["Owner Id (must be a registered AfnoSansaar user)"],
    },
    {
      title: "Media",
      icon: <Camera className="h-5 w-5" />,
      color: "from-teal-500 to-teal-600",
      items: [
        "High-quality room photos",
        "Rooms video (optional)",
        "Multiple angles recommended",
        "Good lighting for better appeal",
      ],
    },
  ];

  const downloadAsImage = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 4,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        logging: false,
        imageTimeout: 0,
        allowTaint: false,
        removeContainer: false,
        backgroundColor: "#ffffff",
        foreignObjectRendering: false,
        width: contentRef.current.offsetWidth,
        height: contentRef.current.offsetHeight,
      });

      const link = document.createElement("a");
      link.download = "room-listing-requirements.png";
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();

      toast({
        title: "Room List",
        description: "Room Listing guide is downloaded!",
      });
    } catch (error) {
      toast({
        title: "Room List",
        description: "Failed to download room listing guide. Try again.",
      });

      console.error("Download error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="relative bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

          <div className="relative p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Info className="h-5 w-5" />
                  </div>

                  <h2 className="text-2xl font-bold">Room Listing Guide</h2>
                </div>

                <p className="text-green-50 text-sm leading-relaxed max-w-md">
                  Everything you need to create a successful room listing
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  onClick={downloadAsImage}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm transition-all duration-200 shadow-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>

                <Button
                  size="sm"
                  onClick={onClose}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm transition-all duration-200 shadow-lg w-9 h-9 p-0"
                >
                  <span className="text-lg leading-none">x</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div ref={contentRef} className="p-6 bg-white">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Room Listing Requirements
              </h1>

              <p className="text-gray-600">
                Make sure you have all this information ready before listing
                your room
              </p>
            </div>

            <div className="grid gap-6">
              {requiredSections.map((section, index) => (
                <Card
                  key={index}
                  className="border-2 border-gray-100 shadow-sm"
                >
                  <CardHeader
                    className={`bg-gradient-to-r ${section.color} text-white rounded-t-lg py-4`}
                  >
                    <CardTitle className="flex items-center gap-3 text-lg">
                      {section.icon}
                      {section.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="grid gap-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />

                          <span className="text-gray-700 text-sm leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-xl border-2 border-green-300">
              <h3 className="text-lg font-bold text-green-900 mb-3">
                💡 Pro Tips
              </h3>

              <div className="grid gap-2 text-sm text-green-800">
                <p>• Capture high-quality photos with clear lighting</p>

                <p>• Write clear descriptions that highlight unique features</p>

                <p>• Be honest about room condition and amenities</p>

                <p>
                  • Be transparent about the room&apos;s condition and amenities
                </p>

                <p>• Set competitive pricing based on location and amenities</p>

                <p>• Keep information concise, accurate, and easy to read</p>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Generated by AfnoSansaar • Room Listing Guide
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredInfoGuide;
