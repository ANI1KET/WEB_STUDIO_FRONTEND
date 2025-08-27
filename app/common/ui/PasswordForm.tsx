"use client";

import { useForm, Controller } from "react-hook-form";
import { Eye, EyeOff, Lock, ArrowLeft, Mail, Phone } from "lucide-react";

import { useSetOrUpdateNumberVerificationFlow } from "../hooks/account/account";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/app/components/ui/input-otp";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface PasswordFormProps {
  onBack: () => void;
  firstTitle: string;
  secondTitle: string;
}

interface FormData {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordForm = ({
  onBack,
  firstTitle,
  secondTitle,
}: PasswordFormProps) => {
  const {
    userId,
    loading,
    currentStep,
    emailOrPhone,
    contactMethod,
    showNewPassword,
    showConfirmPassword,
    handleSendOTP,
    setCurrentStep,
    setEmailOrPhone,
    setContactMethod,
    setShowNewPassword,
    setShowConfirmPassword,
    handleUpdateOrSetPassword,
  } = useSetOrUpdateNumberVerificationFlow();

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { otp: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormData) => {
    const response = await handleUpdateOrSetPassword({ userId, ...data });

    if (response) onBack();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>

          <CardTitle className="text-2xl font-bold text-gray-900">
            {currentStep === "email/number" ? firstTitle : secondTitle}
          </CardTitle>

          <p className="text-gray-600 mt-2">
            {currentStep === "email/number"
              ? "Enter your email or phone number to reset your password"
              : "Enter the verification code and choose a new password"}
          </p>
        </CardHeader>

        <CardContent>
          {currentStep === "email/number" ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-4 block">
                  Choose contact method
                </Label>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setContactMethod("email")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      contactMethod === "email"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Mail className="w-5 h-5 mx-auto mb-1" />

                    <div className="text-sm font-medium">Email</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactMethod("phone")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      contactMethod === "phone"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Phone className="w-5 h-5 mx-auto mb-1" />

                    <div className="text-sm font-medium">Phone</div>
                  </button>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="emailOrPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  {contactMethod === "email" ? "Email Address" : "Phone Number"}
                </Label>

                <Input
                  required
                  id="emailOrPhone"
                  disabled={loading}
                  value={emailOrPhone}
                  placeholder={
                    contactMethod === "email"
                      ? "Enter your email"
                      : "Enter your phone number"
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    if (contactMethod === "phone") {
                      const digits = e.target.value.replace(/\D/g, "");
                      if (digits.length <= 10) setEmailOrPhone(digits);
                    } else {
                      setEmailOrPhone(value);
                    }
                  }}
                  type={contactMethod === "email" ? "email" : "tel"}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-200 to-green-200 hover:from-emerald-300 hover:to-green-300 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                disabled={!emailOrPhone}
              >
                {loading ? "Resend code in 5 min" : "Send Verification Code"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                className="w-full text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    Verification code sent to your {contactMethod}:
                    <span className="font-medium text-gray-800 ml-1">
                      {emailOrPhone}
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={() => setCurrentStep("email/number")}
                    className="text-sm text-green-600 hover:text-green-700 mt-1"
                  >
                    Change {contactMethod}
                  </button>
                </div>

                <Label className="text-sm font-medium text-gray-700">
                  Enter OTP
                </Label>

                <div className="flex justify-center mt-2">
                  <Controller
                    name="otp"
                    control={control}
                    rules={{
                      required: "OTP is required",
                      minLength: { value: 6, message: "OTP must be 6 digits" },
                      maxLength: { value: 6, message: "OTP must be 6 digits" },
                    }}
                    render={({ field }) => (
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot key={0} index={0} />
                          <InputOTPSlot key={1} index={1} />
                          <InputOTPSlot key={2} index={2} />
                          <InputOTPSlot key={3} index={3} />
                          <InputOTPSlot key={4} index={4} />
                          <InputOTPSlot key={5} index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    )}
                  />
                </div>

                {errors.otp && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  New Password
                </Label>

                <div className="relative mt-1">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className="h-12 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {errors.newPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </Label>

                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    className="h-12 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setCurrentStep("email/number")}
                className="w-full text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordForm;
