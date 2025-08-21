import { Permission } from "@prisma/client";

export const getPromotionBenefits = (permissionId: Permission) => {
  const commonBenefits = [
    "Boost listing visibility with targeted promotion campaigns",
    "Priority placement in search results and category pages",
    "Advanced targeting options (location, demographics, interests)",
    "Real-time promotion performance analytics & ROI tracking",
    "A/B testing tools for promotion optimization",
    "Automated bidding strategies for cost-effective campaigns",
    "Custom promotion scheduling (peak hours, weekends)",
    "Enhanced listing badges and premium styling",
    "Featured placement in mobile app and website",
    "Social media cross-promotion integration",
  ];

  const specificBenefits: Record<Permission, string[]> = {
    room: [
      ...commonBenefits,
      "Room-specific tenant targeting and demographics",
      "University and workplace proximity targeting",
      "Student and professional renter preferences",
      "Room feature highlighting (furnished, utilities included)",
      "Roommate compatibility matching promotion",
    ],
    property: [
      ...commonBenefits,
      "Property type and price range targeting",
      "Family size and lifestyle targeting options",
      "Neighborhood and school district targeting",
      "Property feature highlights (garden, parking, etc.)",
      "Investment opportunity targeting for buyers",
    ],
    vehicle: [
      ...commonBenefits,
      "Vehicle make, model, and year targeting",
      "Budget range and financing option targeting",
      "Vehicle condition and mileage highlighting",
      "Fuel type and transmission preference targeting",
      "First-time buyer and collector targeting",
    ],
    hostel: [
      ...commonBenefits,
      "Hostel type (dormitory, private room) targeting",
      "Backpacker and budget traveler targeting",
      "Location-based targeting for tourist hotspots",
      "Hostel amenities and services promotion",
      "Group booking and event hosting promotion",
    ],
    reMarketItem: [
      ...commonBenefits,
      "Re-marketing item type and condition targeting",
      "Eco-friendly and sustainable product promotion",
      "Vintage and collectible item targeting",
      "Price drop and clearance sale promotions",
      "Audience retargeting for previous visitors",
    ],
    promote: [],
  };

  return specificBenefits[permissionId];
};
