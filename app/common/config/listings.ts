import { Permission } from "@prisma/client";
import { Car, Home, Building, LucideProps } from "lucide-react";

export const listingItems: {
  label: string;
  key: Permission;
  description: string;
}[] = [
  {
    key: "room",
    label: "List Room",
    description: "Post your room for rent",
  },
  // {
  //   key: "property",
  //   label: "List Property",
  //   description: "Post your property for sale/rent",
  // },
  // {
  //   key: "vehicle",
  //   label: "List Vehicle",
  //   description: "Post your vehicle for sale/rent",
  // },
];

export const promotionItems: {
  name: string;
  id: Permission;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    id: "room",
    icon: Home,
    name: "Room Listings",
  },
  // {
  //   id: "property",
  //   icon: Building,
  //   name: "Property Listings",
  // },
  // {
  //   icon: Car,
  //   id: "vehicle",
  //   name: "Vehicle Listings",
  // },
  // {
  //   icon: Car,
  //   id: "hostel",
  //   name: "Hostel Listings",
  // },
  // {
  //   icon: Car,
  //   id: "reMarketItem",
  //   name: "ReMarket Item Listings",
  // },
];

export const serviceItems: {
  name: string;
  id: Permission;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  { id: "room", icon: Home, name: "Room Listing Service" },
  // { id: "hostel", icon: Car, name: "Hostel Listings Service" },
  // { id: "vehicle", icon: Car, name: "Vehicle Listing Service" },
  // { id: "property", icon: Building, name: "Property Listing Service" },
];
