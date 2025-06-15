"use client";

import React from "react";
import { Upload, Camera, Video } from "lucide-react";

import { RoomWithMedia } from "@/app/types/types";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface MediaUploadSectionProps {
  selectedImages: File[];
  selectedVideo: File | undefined;
  errors: FieldErrors<RoomWithMedia>;
  onRemoveImage: (index: number) => void;
  register: UseFormRegister<RoomWithMedia>;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MediaUploadSection({
  errors,
  register,
  onImageUpload,
  onRemoveImage,
  selectedVideo,
  selectedImages,
}: MediaUploadSectionProps) {
  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg py-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Camera className="h-5 w-5" />
          Room Images & Videos
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        {/* Image Upload */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-2 block">
            Room Images <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            <input
              multiple
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              {...register("photos", {
                required: "Image is required",
              })}
              onChange={onImageUpload}
            />
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                Click to upload room images
              </p>
            </Label>
            {errors.photos && (
              <p className="text-red-500 text-xs mt-1">
                {errors.photos.message}
              </p>
            )}
          </div>

          {selectedImages.length > 0 && (
            <div className="mt-3 grid grid-cols-3 md:grid-cols-5 gap-2">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`Room ${index + 1}`}
                    src={URL.createObjectURL(file)}
                    className="w-full h-24 object-cover rounded border shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <Button
                    size="sm"
                    type="button"
                    variant="destructive"
                    onClick={() => onRemoveImage(index)}
                    className="absolute bottom-9 left-[5.5rem] flex items-center justify-center bg-red-600 opacity-0 group-hover:opacity-80 transition-opacity rounded"
                  >
                    x
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-2 block">
            Room Videos
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            <input
              type="file"
              accept="video/*"
              id="video-upload"
              className="hidden"
              {...register("videos")}
              // onChange={onVideoUpload}
            />
            <Label htmlFor="video-upload" className="cursor-pointer">
              <Video className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                Click to upload room videos
              </p>
            </Label>
          </div>

          {selectedVideo && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative group">
                <video
                  controls
                  key={
                    selectedVideo
                      ? selectedVideo.name + selectedVideo.lastModified
                      : "no-video"
                  }
                  className="w-full h-40 object-cover rounded border shadow-sm group-hover:shadow-md transition-shadow"
                >
                  <source
                    type={selectedVideo.type}
                    src={URL.createObjectURL(selectedVideo)}
                  />
                  Your browser does not support the video tag.
                </video>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {selectedVideo.name}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default MediaUploadSection;
