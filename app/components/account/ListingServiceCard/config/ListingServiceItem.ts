import { Permission } from "@prisma/client";

export const getServiceBenefits = (service: Permission) => {
  const commonBenefits = [
    "Earn by providing schedule visit and tour services",
    "Help owners find preferred tenants and tenants find best properties",
    "Provide access management to owners and tenants",
    "View interested users for your listings",
    "Manage all bookings and inquiries",
    "Advanced analytics and insights dashboard",
    "Priority placement in search results",
    "Direct messaging system with clients",
    "Professional listing templates and tools",
    "Lead management and conversion tracking",
  ];

  const specificBenefits: Record<Permission, string[]> = {
    room: [
      ...commonBenefits,
      "Room-specific analytics and performance metrics",
      "Tenant screening and verification tools",
      "Room booking calendar management",
    ],
    property: [
      ...commonBenefits,
      "Property documentation and legal support",
      "Market trend analysis for properties",
      "Virtual tour scheduling system",
    ],
    vehicle: [
      ...commonBenefits,
      "Vehicle inspection and valuation tools",
      "Automotive market insights and pricing",
      "Test drive scheduling management",
    ],
    hostel: [
      ...commonBenefits,
      "Hostel-specific booking management",
      "Group booking and discount management",
      "Hostel amenities and service management",
    ],
    reMarketItem: [
      ...commonBenefits,
      "Re-marketing tools and strategies",
      "Audience targeting and segmentation",
      "Performance tracking and analytics",
    ],
    promote: [],
  };

  return specificBenefits[service];
};
