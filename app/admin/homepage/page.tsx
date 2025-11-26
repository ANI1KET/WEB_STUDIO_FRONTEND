"use client";

import { useState, useEffect } from "react";

import { homepageApi, HomepageContent } from "@/app/ServerAction/homepageApis";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { AdminLayout } from "@/app/components/admin/AdminLayout";

const Homepage = () => {
  const [content, setContent] = useState<HomepageContent>({
    heroHeading: "",
    heroSubheading: "",
    eventsOcSectionCopy: "",
    eventsOfCenturySectionText: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await homepageApi.get();
      setContent(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await homepageApi.update(content);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Homepage Content</h1>
        <p className="text-muted-foreground mt-2">
          Manage your homepage sections
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroHeading">Hero Heading</Label>
              <Input
                id="heroHeading"
                value={content.heroHeading}
                onChange={(e) =>
                  setContent({ ...content, heroHeading: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heroSubheading">Hero Subheading</Label>
              <Input
                id="heroSubheading"
                value={content.heroSubheading}
                onChange={(e) =>
                  setContent({ ...content, heroSubheading: e.target.value })
                }
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events OC Section</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="eventsOcSectionCopy">Section Copy</Label>
              <Textarea
                id="eventsOcSectionCopy"
                value={content.eventsOcSectionCopy}
                onChange={(e) =>
                  setContent({
                    ...content,
                    eventsOcSectionCopy: e.target.value,
                  })
                }
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events of the Century Section</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="eventsOfCenturySectionText">Section Text</Label>
              <Textarea
                id="eventsOfCenturySectionText"
                value={content.eventsOfCenturySectionText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    eventsOfCenturySectionText: e.target.value,
                  })
                }
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Homepage;
