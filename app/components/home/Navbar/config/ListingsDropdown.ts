import { Permission } from "@prisma/client";

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
  {
    key: "property",
    label: "List Property",
    description: "Post your property for sale/rent",
  },
  {
    key: "vehicle",
    label: "List Vehicle",
    description: "Post your vehicle for sale/rent",
  },
];
