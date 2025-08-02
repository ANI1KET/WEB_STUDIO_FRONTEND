import React from "react";
import { getServerSession } from "next-auth";

import {
  canAccessPromotion,
  canAccessListingService,
} from "../common/config/authorization";
import { authOptions } from "../api/auth/[...nextauth]/options";

import PromotionCard from "../components/profile/PromotionCard";
import PermissionsCard from "../components/profile/PermissionsCard";
import ListingServiceCard from "../components/profile/ListingServiceCard";
import PersonalInfoSection from "../components/profile/PersonalInfoSection";

const ProfileLayout = async () => {
  const session = await getServerSession(authOptions);

  const permissions = session?.user.permission ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-green-700">
            Manage your account information and preferences
          </p>
        </div>

        <div className="space-y-8">
          <PersonalInfoSection session={session} />
          <PermissionsCard userPermissions={permissions} />

          {canAccessPromotion(session?.user.role) && (
            <PromotionCard userPermissions={permissions} />
          )}

          {canAccessListingService(session?.user.role) && (
            <ListingServiceCard userPermissions={permissions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
