import { Role } from "@prisma/client";

const PROMOTE = "promote"; // Means the user can promote lister's listing
const DASHBOARD = "dashboard"; // Means the user can access the dashboard
const CAN_BOOK = "can_book"; // Means the user who can book their listed listings
const PROMOTION = "promotion"; // Means the user can promote their listing
const INTERESTED = "interested"; // Means the user can show interest in a listing
const SCHEDULE_VISIT = "schedule_visit"; // Means the user whose posted listings can be scheduled visit
const LISTING_SERVICE = "listing_service"; // Means the user who provide listing services
const SHOW_INTERESTED = "show_interested"; // Means the user whose posted listings can be shown interest

// AUTHORIZATION
const rolePermissions: Record<Role, string[]> = {
  BROKER: [
    CAN_BOOK,
    DASHBOARD,
    PROMOTION,
    INTERESTED,
    SCHEDULE_VISIT,
    LISTING_SERVICE,
    SHOW_INTERESTED,
  ],
  ADMIN: [DASHBOARD],
  USER: [PROMOTE, INTERESTED, LISTING_SERVICE, SCHEDULE_VISIT],
  OWNER: [CAN_BOOK, DASHBOARD, INTERESTED, PROMOTION, SHOW_INTERESTED],
};

//
export const canBook = ({
  role,
  userId,
  ownerId,
  listerId,
}: {
  role: Role;
  userId: string;
  ownerId: string;
  listerId: string;
}): boolean => {
  return (
    rolePermissions[role].includes(CAN_BOOK) &&
    (listerId === userId || ownerId === userId)
  );
};

export const canPromote = (role: Role | undefined): boolean => {
  return rolePermissions[role as Role].includes(PROMOTE);
};

export const canShowInterest = ({
  userId,
  ownerId,
  listerId,
  postedBy,
}: {
  userId: string;
  postedBy: Role;
  ownerId: string;
  listerId: string;
}): boolean => {
  return (
    rolePermissions[postedBy].includes(SHOW_INTERESTED) &&
    ownerId !== userId &&
    listerId !== userId
  );
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

export const canAcessScheduleVisit = ({
  userId,
  ownerId,
  listerId,
  postedBy,
  available,
}: {
  userId: string;
  ownerId: string;
  listerId: string;
  available: boolean;
  postedBy: Role | undefined;
}): boolean => {
  return (
    available &&
    rolePermissions[postedBy as Role].includes(SCHEDULE_VISIT) &&
    ownerId !== userId &&
    listerId !== userId
  );
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
