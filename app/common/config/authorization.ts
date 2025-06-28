import { Role } from "@prisma/client";

// AUTHORIZATION
const rolePermissions: Record<Role, string[]> = {
  ADMIN: ["dashboard"],
  OWNER: ["dashboard"],
  BROKER: ["dashboard"],
  USER: ["promote", "interested"],
};

//
export const canShowInterest = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("interested");
};

export const canAccessDashboard = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("dashboard");
};

export const canAccessInterested = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("interested");
};

//
export const canPromote = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("promote");
};
//

//
export const hasPermission = (
  pathSegment: string,
  userPermissions: string[]
): boolean => {
  return userPermissions.includes(pathSegment);
};

export const canUseInterested = (role: Role): boolean => {
  return rolePermissions[role as Role].includes("interested");
};

export const canUseDashboard = (role: Role, secondSegment: string): boolean => {
  return (
    secondSegment === role.toLowerCase() &&
    rolePermissions[role as Role].includes("dashboard")
  );
};
