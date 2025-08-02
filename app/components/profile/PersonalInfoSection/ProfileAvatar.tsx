"use client";

import React from "react";
import { Role } from "@prisma/client";
import { Camera, User } from "lucide-react";

import { useToast } from "@/app/common/hooks/use-toast";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface ProfileAvatarProps {
  role: Role | undefined;
  name: string | null | undefined;
  image: string | null | undefined;
}

const ProfileAvatar = ({ name, image, role }: ProfileAvatarProps) => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full md:w-auto">
      <div className="flex flex-col items-center gap-1 mb-1">
        <Avatar className="shadow-lg">
          {image ? (
            <AvatarImage src={image} alt={name ?? ""} />
          ) : (
            <AvatarFallback className="bg-green-100 text-green-700 text-xl font-bold" />
          )}
        </Avatar>

        <Button
          size="sm"
          className="rounded-full w-7 h-7 hover:bg-gray-600 border-0 p-0"
          onClick={() => {
            toast({
              title: "Feature Coming Soon",
              description: "Profile picture upload will be available soon.",
            });
          }}
        >
          <Camera className="w-3 h-3 text-white" />
        </Button>
      </div>

      <Badge
        className={`bg-green-100 text-green-700 border-green-200 border font-medium`}
      >
        <User className="w-3 h-3 mr-1" />
        {role}
      </Badge>
    </div>
  );
};

export default ProfileAvatar;
