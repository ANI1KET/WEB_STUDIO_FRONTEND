import React from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/options";

import AccountNavigation from "./AccountNavigation";
import PermissionsCard from "../components/account/PermissionsCard";
import PersonalInfoSection from "../components/account/PersonalInfoSection";

const AccountLayout = async () => {
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
            Manage your profile information and preferences
          </p>
        </div>

        <AccountNavigation path={"/account"} />

        <div className="space-y-8">
          <PersonalInfoSection session={session} />

          <PermissionsCard userPermissions={permissions} />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
