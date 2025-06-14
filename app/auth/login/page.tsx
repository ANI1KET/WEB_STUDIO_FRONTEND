"use client";

import { useState } from "react";

import MainLoginForm from "@/app/components/auth/login/MainLoginForm";
import CreatePasswordForm from "@/app/components/auth/login/CreatePasswordForm";
import ForgotPasswordForm from "@/app/components/auth/login/ForgotPasswordForm";

const Login = () => {
  const [currentView, setCurrentView] = useState<"login" | "forgot" | "create">(
    "login"
  );

  const handleBackToLogin = () => setCurrentView("login");
  const handleCreatePassword = () => setCurrentView("create");
  const handleForgotPassword = () => setCurrentView("forgot");

  if (currentView === "forgot") {
    return <ForgotPasswordForm onBack={handleBackToLogin} />;
  }

  if (currentView === "create") {
    return <CreatePasswordForm onBack={handleBackToLogin} />;
  }

  return (
    <MainLoginForm
      onForgotPassword={handleForgotPassword}
      onCreatePassword={handleCreatePassword}
    />
  );
};

export default Login;
