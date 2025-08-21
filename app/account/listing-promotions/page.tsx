import React from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { canAccessPromotion } from "@/app/common/config/authorization";

import AccountNavigation from "../AccountNavigation";
import PromotionCard from "@/app/components/account/PromotionCard";

const AccountLayout = async () => {
  const session = await getServerSession(authOptions);
  const permissions = session?.user.permission ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">
            Listings Promotion
          </h1>

          <p className="text-green-700">Configure your listings promotion</p>
        </div>

        <AccountNavigation path={"/account/listing-promotions"} />

        <div className="space-y-8">
          {canAccessPromotion(session?.user.role) && (
            <PromotionCard userPermissions={permissions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
