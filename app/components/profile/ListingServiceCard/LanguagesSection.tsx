"use client";

import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Languages, Plus, X, Check } from "lucide-react";

import { ServiceData } from "../types/ListingServiceCard";
import { nepalLanguagesOptions } from "@/app/common/config/nepal";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Combobox } from "@/app/components/ui/combobox";

interface LanguagesSectionProps {
  languages: string[];
  editingField: string | null;
  onEditStart: (field: string) => void;
  setValue: UseFormSetValue<ServiceData>;
}

const LanguagesSection = ({
  setValue,
  languages,
  onEditStart,
  editingField,
}: LanguagesSectionProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleAdd = () => {
    const trimmedLanguage = selectedLanguage.trim();
    if (trimmedLanguage && !languages.includes(trimmedLanguage)) {
      setValue("supportedLanguages", [...languages, trimmedLanguage]);
      setSelectedLanguage("");
      onEditStart("");
    }
  };

  const handleLanguageRemove = (language: string) => {
    setValue(
      "supportedLanguages",
      languages.filter((lang) => lang !== language)
    );
  };

  const handleCancel = () => {
    setSelectedLanguage("");
    onEditStart("");
  };

  const handleLanguageSelect = (languageValue: string) => {
    setSelectedLanguage(languageValue);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-blue-600" />

          <h3 className="text-lg font-semibold text-gray-900">
            Languages Known
          </h3>
        </div>

        {editingField !== "languages" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEditStart("languages")}
            className="text-blue-600 hover:text-blue-700 border-blue-300 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Language
          </Button>
        )}
      </div>

      {editingField === "languages" && (
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <Combobox
              className="w-full"
              allowCustom={true}
              value={selectedLanguage}
              options={nepalLanguagesOptions}
              onValueChange={handleLanguageSelect}
              placeholder="Select or type a language..."
            />
          </div>

          <Button
            size="sm"
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="w-4 h-4" />
          </Button>

          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {languages.length > 0 ? (
          languages.map((language, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 py-1 px-3 bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              {language}
              <button
                onClick={() => handleLanguageRemove(language)}
                className="ml-1 hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No languages added yet</p>
        )}
      </div>
    </div>
  );
};

export default LanguagesSection;
