import React from "react";

import AccountNavigation from "../AccountNavigation";

const AccountLayout = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">
            Bank Details
          </h1>

          <p className="text-green-700">
            Manage your banking information for payments
          </p>
        </div>
        <AccountNavigation path={"/account/bank-details"} />;
        <div className="space-y-8"></div>
      </div>
    </div>
  );
};

export default AccountLayout;
