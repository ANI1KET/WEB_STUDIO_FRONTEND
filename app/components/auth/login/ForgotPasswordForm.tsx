"use client";

import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending reset email to:", email);
      alert("Password reset email sent! Check your inbox.");
      onBack();
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>

          <CardTitle className="text-2xl font-bold text-gray-900">
            Forgot Password
          </CardTitle>

          <p className="text-gray-600 mt-2">
            Enter your email to receive a reset link
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>

              <Input
                required
                id="email"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-12 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {loading ? "Sending..." : "Send Reset Link"}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
