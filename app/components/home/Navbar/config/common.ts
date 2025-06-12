import { Role } from "@prisma/client";

// AUTHORIZATION
const rolePermissions: Record<Role, string[]> = {
  USER: ["promote"],
  ADMIN: ["dashboard"],
  OWNER: ["dashboard"],
  BROKER: ["dashboard"],
};

export const canPromote = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("promote");
};

export const canAccessDashboard = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("dashboard");
};
