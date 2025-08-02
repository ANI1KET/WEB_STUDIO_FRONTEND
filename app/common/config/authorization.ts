import { Role } from "@prisma/client";

// AUTHORIZATION
const rolePermissions: Record<Role, string[]> = {
  ADMIN: ["dashboard"],
  USER: ["promote", "interested"],
  OWNER: ["dashboard", "listing_service"],
  BROKER: ["dashboard", "listing_service", "promotion", "schedule_visit"],
};

//
export const canPromote = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("promote");
};

export const canShowInterest = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("interested");
};

export const canAccessDashboard = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("dashboard");
};

export const canAccessPromotion = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("promotion");
};

export const canAccessInterested = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("interested");
};

export const canAccessListingService = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("listing_service");
};

export const canAcessScheduleVisit = (
  role: Role | undefined,
  available: boolean
): boolean => {
  return rolePermissions[role as Role].includes("schedule_visit") && available;
};

// ROUTING VALIDATION
export const hasPermission = (
  pathSegment: string,
  userPermissions: string[]
): boolean => {
  return userPermissions.includes(pathSegment);
};

export const canRouteDashboard = (
  role: Role,
  secondSegment: string
): boolean => {
  return (
    secondSegment === role.toLowerCase() &&
    rolePermissions[role as Role].includes("dashboard")
  );
};

export const canRouteInterested = (role: Role): boolean => {
  return rolePermissions[role as Role].includes("interested");
};

export const canRoutePromote = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes("promote");
};
