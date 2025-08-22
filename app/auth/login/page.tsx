"use client";

import { useState } from "react";

import PasswordForm from "@/app/common/ui/PasswordForm";
import MainLoginForm from "@/app/components/auth/login/MainLoginForm";

const Login = () => {
  const [currentView, setCurrentView] = useState<"login" | "forgot" | "create">(
    "login"
  );

  const handleBackToLogin = () => setCurrentView("login");
  const handleCreatePassword = () => setCurrentView("create");
  const handleForgotPassword = () => setCurrentView("forgot");

  if (currentView === "forgot") {
    return (
      <PasswordForm
        onBack={handleBackToLogin}
        firstTitle="Forgot Password"
        secondTitle="Reset Password"
      />
    );
  }

  if (currentView === "create") {
    return (
      <PasswordForm
        onBack={handleBackToLogin}
        firstTitle="Set Password"
        secondTitle="Create Password"
      />
    );
  }

  return (
    <MainLoginForm
      onForgotPassword={handleForgotPassword}
      onCreatePassword={handleCreatePassword}
    />
  );
};

export default Login;
