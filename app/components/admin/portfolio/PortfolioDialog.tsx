"use client";

import { useEffect } from "react";
import { EventType } from "@prisma/client";
import { useForm, Controller } from "react-hook-form";

import { usePortfolioEvents } from "./hook";
import { PortfolioEvent } from "@/app/ServerAction/portfolioApis";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";

interface PortfolioDialogProps {
  open: boolean;
  event: PortfolioEvent | null;
  onOpenChange: (open: boolean) => void;
}

export const PortfolioDialog = ({
  open,
  event,
  onOpenChange,
}: PortfolioDialogProps) => {
  const { createEvent, updateEvent } = usePortfolioEvents();

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Omit<PortfolioEvent, "id">>({
    defaultValues: {
      slug: "",
      date: "",
      title: "",
      location: "",
      reviewText: "",
      shortSummary: "",
      coverImageUrl: "",
      galleryImages: [],
      isFeatured: false,
      fullDescription: "",
      eventType: EventType.WEDDING,
    },
  });

  useEffect(() => {
    if (event) {
      reset({
        slug: event.slug,
        title: event.title,
        location: event.location,
        eventType: event.eventType,
        isFeatured: event.isFeatured,
        shortSummary: event.shortSummary,
        coverImageUrl: event.coverImageUrl,
        galleryImages: event.galleryImages,
        reviewText: event.reviewText ?? "",
        fullDescription: event.fullDescription,
        date: event.date
          ? new Date(event.date).toISOString().split("T")[0]
          : "",
      });
    } else {
      reset({
        slug: "",
        date: "",
        title: "",
        location: "",
        reviewText: "",
        shortSummary: "",
        coverImageUrl: "",
        galleryImages: [],
        isFeatured: false,
        fullDescription: "",
        eventType: EventType.WEDDING,
      });
    }
  }, [event, reset]);

  const onSubmit = async (data: Omit<PortfolioEvent, "id">) => {
    const payload = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    if (event?.id) {
      updateEvent.mutate({ id: event.id, data: payload });
    } else {
      createEvent.mutate(payload);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create Event"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                {...register("slug", { required: "Slug is required" })}
              />
              {errors.slug && (
                <p className="text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <select
                id="eventType"
                {...register("eventType", {
                  required: "Event type is required",
                })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                {Object.values(EventType).map((type) => (
                  <option key={type} value={type}>
                    {type.replaceAll("_", " ")}
                  </option>
                ))}
              </select>

              {errors.eventType && (
                <p className="text-sm text-red-600">
                  {errors.eventType.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortSummary">Short Summary</Label>
            <Textarea
              id="shortSummary"
              rows={2}
              {...register("shortSummary", {
                required: "Short summary is required",
              })}
            />
            {errors.shortSummary && (
              <p className="text-sm text-red-600">
                {errors.shortSummary.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              rows={4}
              {...register("fullDescription", {
                required: "Full description is required",
              })}
            />
            {errors.fullDescription && (
              <p className="text-sm text-red-600">
                {errors.fullDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImageUrl">Cover Image URL</Label>
            <Input
              id="coverImageUrl"
              type="url"
              {...register("coverImageUrl", {
                required: "Cover image URL is required",
              })}
            />
            {errors.coverImageUrl && (
              <p className="text-sm text-red-600">
                {errors.coverImageUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewText">Review Text (Optional)</Label>
            <Textarea id="reviewText" rows={2} {...register("reviewText")} />
          </div>

          <Controller
            control={control}
            name="isFeatured"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="isFeatured">Featured Event</Label>
              </div>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Save Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
