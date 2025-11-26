"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { PortfolioEvent } from "@/app/ServerAction/portfolioApis";
import { usePortfolioEvents } from "@/app/components/admin/portfolio/hook";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { PortfolioDialog } from "@/app/components/admin/portfolio/PortfolioDialog";

const Portfolio = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<PortfolioEvent | null>(null);

  const { query, deleteEvent } = usePortfolioEvents();

  const handleCreate = () => {
    setEditingEvent(null);
    setDialogOpen(true);
  };

  const handleEdit = (event: PortfolioEvent) => {
    setEditingEvent(event);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    deleteEvent.mutate(id);
  };

  if (query.isLoading) return <div>Loading...</div>;
  if (query.error)
    return <div>Error loading events: {query.error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Events</h1>
          <p className="text-muted-foreground mt-2">
            Manage your event portfolio
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(query.data ?? []).map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="aspect-video relative overflow-hidden rounded-md">
                <Image
                  fill
                  alt={event.title}
                  src={event.coverImageUrl}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(event.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 line-clamp-2">{event.shortSummary}</p>
              <div className="flex gap-2 justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(event)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PortfolioDialog
        open={dialogOpen}
        event={editingEvent}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Portfolio;
