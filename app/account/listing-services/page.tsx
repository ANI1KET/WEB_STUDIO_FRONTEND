"use server";

import React from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { canAccessListingService } from "@/app/common/config/authorization";

import AccountNavigation from "../AccountNavigation";
import ListingServiceCard from "@/app/components/account/ListingServiceCard";

const AccountLayout = async () => {
  const session = await getServerSession(authOptions);
  const permissions = session?.user.permission ?? [];
  const role = session?.user.role;
  const hasAccess = canAccessListingService(role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">
            Listings Service
          </h1>

          <p className="text-green-700">Configure your listings service </p>
        </div>

        <AccountNavigation path={"/account/listing-services"} />

        <div className="space-y-8">
          {hasAccess ? (
            <ListingServiceCard userPermissions={permissions} />
          ) : (
            <div className="p-6 bg-white border border-green-200 rounded-md text-center">
              <p className="text-green-700">
                As a <span className="font-medium">{role}</span>, you do not
                provide listings service directly. You can continue to view and
                manage your own listings from your dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
