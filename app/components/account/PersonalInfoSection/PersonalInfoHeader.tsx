"use client";

import React from "react";
import { Edit, ClipboardCheck } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/common/hooks/use-toast";

interface PersonalInfoHeaderProps {
  isEditing: boolean;
  id: string | undefined;
  onEditClick: () => void;
}

const PersonalInfoHeader = ({
  id,
  isEditing,
  onEditClick,
}: PersonalInfoHeaderProps) => {
  const { toast } = useToast();

  const handleCopyId = async () => {
    if (!id) return;
    try {
      await navigator.clipboard.writeText(id);
      toast({ title: "Copy ID", description: "ID copied to clipboard" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Copy ID",
        description: "Failed to copy ID",
      });
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-2xl font-bold text-green-800">
        Personal Information
      </h2>

      <div className="flex gap-4">
        <Button
          onClick={handleCopyId}
          className="hover:bg-green-200 text-white"
        >
          <ClipboardCheck className="w-4 h-4" />
          Copy ID
        </Button>

        {!isEditing && (
          <Button
            onClick={onEditClick}
            className="hover:bg-green-200 text-white"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoHeader;
