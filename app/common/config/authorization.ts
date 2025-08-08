import { Role } from "@prisma/client";

const PROMOTE = "promote"; // Means the user can promote lister's listing
const DASHBOARD = "dashboard"; // Means the user can access the dashboard
const PROMOTION = "promotion"; // Means the user can promote their listing
const INTERESTED = "interested"; // Means the user can show interest in a listing
const SCHEDULE_VISIT = "schedule_visit"; // Means the user whose posted listings can be scheduled visit
const LISTING_SERVICE = "listing_service"; // Means the user who provide listing services

// AUTHORIZATION
const rolePermissions: Record<Role, string[]> = {
  ADMIN: [DASHBOARD],
  OWNER: [DASHBOARD, PROMOTION],
  USER: [PROMOTE, INTERESTED, LISTING_SERVICE],
  BROKER: [DASHBOARD, LISTING_SERVICE, PROMOTION, SCHEDULE_VISIT],
};

//
export const canPromote = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes(PROMOTE);
};

export const canShowInterest = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes(INTERESTED);
};

export const canAccessDashboard = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes(DASHBOARD);
};

export const canAccessPromotion = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes(PROMOTION);
};

export const canAccessInterested = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes(INTERESTED);
};

export const canAccessListingService = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes(LISTING_SERVICE);
};

export const canAcessScheduleVisit = (
  role: Role | undefined,
  available: boolean
): boolean => {
  return rolePermissions[role as Role].includes(SCHEDULE_VISIT) && available;
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
    rolePermissions[role as Role].includes(DASHBOARD)
  );
};

export const canRouteInterested = (role: Role): boolean => {
  return rolePermissions[role as Role].includes(INTERESTED);
};

export const canRoutePromote = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes(PROMOTE);
};
