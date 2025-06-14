"use client";

import { toast } from "sonner";
import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";

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

interface CreatePasswordFormProps {
  onBack: () => void;
}

interface FormData {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

const CreatePasswordForm = ({ onBack }: CreatePasswordFormProps) => {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { otp: "", newPassword: "", confirmPassword: "" },
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const otpSlots = useMemo(
    () => [...Array(6)].map((_, i) => <InputOTPSlot key={i} index={i} />),
    []
  );

  const onSubmit = async (data: FormData) => {
    if (data.otp !== "123456") {
      toast.error("Invalid OTP");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    toast.success("Password created successfully!");
    onBack();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Create Password
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Verify your email and set a new password
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Enter OTP sent to your email
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
                      <InputOTPGroup>{otpSlots}</InputOTPGroup>
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

            {/* New Password */}
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

            {/* Confirm Password */}
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
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
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

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {isSubmitting ? "Creating..." : "Create Password"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="w-full text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePasswordForm;
