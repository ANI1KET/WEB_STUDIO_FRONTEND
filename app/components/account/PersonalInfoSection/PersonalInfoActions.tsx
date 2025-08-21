"use client";

import React from "react";
import { Save, X } from "lucide-react";

import { Button } from "@/app/components/ui/button";

interface PersonalInfoActionsProps {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const PersonalInfoActions = ({
  onSave,
  onCancel,
  isEditing,
}: PersonalInfoActionsProps) => {
  if (!isEditing) return null;

  return (
    <div className="flex gap-3 border-t border-green-200 mt-4 pt-2">
      <Button onClick={onSave} className="hover:bg-green-200 text-white">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>

      <Button variant="outline" onClick={onCancel}>
        <X className="w-4 h-4 mr-2" />
        Cancel
      </Button>
    </div>
  );
};

export default PersonalInfoActions;
