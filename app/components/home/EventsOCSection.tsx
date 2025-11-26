"use client";

import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

import { homepageApi, HomepageContent } from "@/app/ServerAction/homepageApis";

import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { usePortfolioEvents } from "../admin/portfolio/hook";

export const EventsOCSection = () => {
  const { query } = usePortfolioEvents();

  const [content, setContent] = useState<HomepageContent>({
    heroHeading: "",
    heroSubheading: "",
    eventsOcSectionCopy: "",
    eventsOfCenturySectionText: "",
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await homepageApi.get();
      setContent(data);
    } catch (error) {
      console.error("Failed to load content");
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gold" />
            <div className="w-3 h-3 border-2 border-gold rotate-45" />
            <h2 className="text-4xl md:text-5xl font-serif text-gold tracking-wider">
              EVENTS OC
            </h2>
            <div className="w-3 h-3 border-2 border-gold rotate-45" />
            <div className="w-16 h-px bg-gold" />
          </div>

          <p className="text-base md:text-lg text-foreground/80 max-w-5xl mx-auto leading-relaxed px-4">
            {content.eventsOcSectionCopy ||
              "EventOC plans high-energy celebrations across the Byron Bays, Sunshine Coast & Gold Coast — birthdays, brand openings, hens nights, beach & pool parties, private and community events, and live music. We handle venues, catering, entertainment, AV, styling, florals, and photographers, or we will plug in your preferred vendors. One organiser, one plan, zero stress."}
          </p>
        </div>

        <Carousel
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {(query.data ?? []).map((event, index) => (
              <CarouselItem key={index} className="basis-1/3 md:basis-1/4">
                <div className="aspect-[2/3] rounded-3xl overflow-hidden relative group">
                  <img
                    alt={event.title}
                    src={event.coverImageUrl}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <h3 className="absolute top-4 left-4 text-black font-semibold text-lg shadow px-2 py-1 bg-white/70 rounded">
                    {event.title}
                  </h3>
                  <p className="absolute top-16 left-4 text-black text-xs shadow px-2 py-1 bg-white/70 rounded">
                    {event.location}
                  </p>
                  <p className="absolute top-24 left-4 text-black text-xs shadow px-2 py-1 bg-white/70 rounded">
                    {event.eventType}
                  </p>
                  <p className="absolute bottom-4 left-4 right-4 text-black text-sm line-clamp-3 shadow px-3 py-2 bg-white/70 rounded">
                    {event.shortSummary}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 rounded-full w-12 h-12 border-gold text-gold hover:bg-gold hover:text-background" />
          <CarouselNext className="right-4 rounded-full w-12 h-12 border-gold text-gold hover:bg-gold hover:text-background" />
        </Carousel>
      </div>
    </section>
  );
};
