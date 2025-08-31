"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef, useMemo } from "react";

import {
  Carousel,
  CarouselItem,
  CarouselContent,
  type CarouselApi,
} from "@/app/components/ui/carousel";
import { Card, CardContent } from "@/app/components/ui/card";

const AdvertisementSection = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const autoplayPlugin = useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  const advertisements = [
    {
      id: "ad-1",
      title: "Himalaya International School",
      description: "Quality Education for Bright Future",
      category: "Education",
      location: "Kathmandu Valley",
      city: "Kathmandu",
      phone: "+977-1-4567890",
      email: "info@himalayaschool.edu.np",
      website: "www.himalayaschool.edu.np",
      image: "/placeholder.svg",
      color: "from-blue-500 to-indigo-600",
      established: "2010",
      services: "Kindergarten to Grade 12",
    },
    {
      id: "ad-2",
      title: "Nepal Heritage Restaurant",
      description: "Authentic Nepali Cuisine & Cultural Experience",
      category: "Restaurant",
      location: "Thamel",
      city: "Kathmandu",
      phone: "+977-1-4567891",
      email: "contact@nepalheritage.com",
      website: "www.nepalheritage.com",
      image: "/placeholder.svg",
      color: "from-green-500 to-emerald-600",
      established: "2015",
      services: "Dining, Cultural Shows, Events",
    },
    {
      id: "ad-3",
      title: "Digital Innovation Hub",
      description: "Complete Digital Marketing & Web Solutions",
      category: "Technology",
      location: "New Baneshwor",
      city: "Kathmandu",
      phone: "+977-1-4567892",
      email: "hello@digitalhub.com.np",
      website: "www.digitalhub.com.np",
      image: "/placeholder.svg",
      color: "from-purple-500 to-pink-600",
      established: "2018",
      services: "Web Development, SEO, Digital Marketing",
    },
    {
      id: "ad-4",
      title: "Elite Fashion Boutique",
      description: "Premium Fashion & Designer Collections",
      category: "Fashion",
      location: "Durbar Marg",
      city: "Kathmandu",
      phone: "+977-1-4567893",
      email: "shop@elitefashion.com.np",
      website: "www.elitefashion.com.np",
      image: "/placeholder.svg",
      color: "from-orange-500 to-red-600",
      established: "2012",
      services: "Designer Wear, Custom Tailoring",
    },
    {
      id: "ad-5",
      title: "Prime Medical Center",
      description: "Advanced Healthcare Services 24/7",
      category: "Healthcare",
      location: "Maharajgunj",
      city: "Kathmandu",
      phone: "+977-1-4567894",
      email: "info@primemedical.com.np",
      website: "www.primemedical.com.np",
      image: "/placeholder.svg",
      color: "from-teal-500 to-cyan-600",
      established: "2008",
      services: "Emergency Care, Surgery, Diagnostics",
    },
    {
      id: "ad-6",
      title: "TechZone Electronics",
      description: "Latest Gadgets & Premium Electronics",
      category: "Electronics",
      location: "New Road",
      city: "Kathmandu",
      phone: "+977-1-4567895",
      email: "sales@techzone.com.np",
      website: "www.techzone.com.np",
      image: "/placeholder.svg",
      color: "from-yellow-500 to-amber-600",
      established: "2016",
      services: "Retail, Repair, Warranty Service",
    },
    {
      id: "ad-7",
      title: "Apex Fitness Studio",
      description: "Premium Fitness & Wellness Center",
      category: "Fitness",
      location: "Lazimpat",
      city: "Kathmandu",
      phone: "+977-1-4567896",
      email: "fitness@apexstudio.com.np",
      website: "www.apexstudio.com.np",
      image: "/placeholder.svg",
      color: "from-red-500 to-pink-600",
      established: "2019",
      services: "Gym, Yoga, Personal Training",
    },
    {
      id: "ad-8",
      title: "Himalayan Adventures",
      description: "Luxury Travel & Adventure Experiences",
      category: "Travel",
      location: "Jhamsikhel",
      city: "Lalitpur",
      phone: "+977-1-4567897",
      email: "tours@himalayanadventures.com",
      website: "www.himalayanadventures.com",
      image: "/placeholder.svg",
      color: "from-indigo-500 to-purple-600",
      established: "2014",
      services: "Trekking, Expeditions, Cultural Tours",
    },
  ];

  const randomStartIndex = useMemo(() => {
    return Math.floor(Math.random() * advertisements.length);
  }, [advertisements.length]);

  return (
    <section className="relative overflow-hidden">
      <div className="md:max-w-5xl lg:max-w-7xl xl:max-w-full mx-auto relative z-10">
        <div className="text-center text-lg text-green-700 font-semibold max-w-md mx-auto mt-2 mb-4">
          Discover businesses and services in your area
        </div>

        <div
          className="relative md:px-8"
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.play()}
        >
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "start",
              dragFree: true,
              watchDrag: true,
              skipSnaps: false,
              watchResize: true,
              containScroll: "trimSnaps",
              startIndex: randomStartIndex,
            }}
            plugins={[autoplayPlugin.current]}
            className="w-full max-w-7xl mx-auto group"
          >
            <CarouselContent className="-ml-4">
              {advertisements.map((ad) => (
                <CarouselItem
                  key={ad.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="group transition-all duration-300 border border-white/20 overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-md hover:shadow-xl">
                    <div
                      className={`h-44 bg-gradient-to-r ${ad.color} relative overflow-hidden`}
                    >
                      <Image
                        fill
                        sizes="100%"
                        loading="lazy"
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                        {ad.category}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white">
                        Est. {ad.established}
                      </div>
                    </div>

                    <CardContent className="py-2 px-4 space-y-2">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight line-clamp-1">
                          {ad.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {ad.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>

                          <span className="font-medium truncate">
                            {ad.location}, {ad.city}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>

                          <span className="font-medium truncate">
                            {ad.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9"
                            />
                          </svg>

                          <span className="font-medium text-blue-600 truncate">
                            {ad.website}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            />
                          </svg>

                          <span className="font-medium">{ad.services}</span>
                        </div>
                      </div>

                      <button
                        className={`w-full bg-gradient-to-r ${ad.color} text-white py-2.5 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:opacity-90 relative overflow-hidden`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>View Details</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <button
              onClick={() => api?.scrollPrev()}
              className="absolute -left-8 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-emerald-600/80 hover:bg-emerald-600/90 border border-emerald-500/50 hover:border-emerald-400/70 text-white backdrop-blur-sm shadow-lg w-14 h-14 rounded-full hover:scale-110 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => api?.scrollNext()}
              className="absolute -right-8 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-emerald-600/80 hover:bg-emerald-600/90 border border-emerald-500/50 hover:border-emerald-400/70 text-white backdrop-blur-sm shadow-lg w-14 h-14 rounded-full hover:scale-110 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
