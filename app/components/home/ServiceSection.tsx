"use client";

import {
  Car,
  Home,
  Truck,
  Wrench,
  Package,
  HandHeart,
  Building2,
  ExternalLink,
} from "lucide-react";
import React, { useState } from "react";

import { Card } from "@/app/components/ui/card";

type Category = "listing" | "room" | "property" | "vehicle" | "general";

interface Service {
  id: number;
  title: string;
  description: string;
  buttonTitle: string;
  hoverDescription: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface CategoryItem {
  id: Category;
  name: string;
}

const categories: CategoryItem[] = [
  { id: "listing", name: "Listing" },
  { id: "room", name: "Room" },
  { id: "property", name: "Property" },
  { id: "vehicle", name: "Vehicle" },
  { id: "general", name: "General" },
];

const serviceMap: Record<Category, Service[]> = {
  listing: [
    {
      id: 1,
      icon: Package,
      buttonTitle: "Book Expert",
      title: "Room Rental Solutions",
      description:
        "Find reliable tenants or discover rooms that fit your lifestyle and budget.",
      hoverDescription:
        "Listers match verified tenants and guide seekers to the best rooms effortlessly.",
    },
    {
      id: 2,
      icon: Home,
      buttonTitle: "Book Expert",
      title: "Expert House & Land Assistance",
      description:
        "Sell your house or land quickly, or get guidance to find the perfect property.",
      hoverDescription:
        "Listers connect owners with buyers and help seekers explore properties smoothly.",
    },
    {
      id: 3,
      icon: Building2,
      buttonTitle: "Book Expert",
      title: "Hostel Booking & Management",
      description:
        "Fill hostel vacancies or find the best hostel for your stay easily.",
      hoverDescription:
        "Connect seekers and owners to find trusted tenants and the right hostel quickly.",
    },
    {
      id: 4,
      icon: Car,
      buttonTitle: "Book Expert",
      title: "Vehicle Buying & Selling Assistance",
      description:
        "Sell, rent, or find the ideal vehicle with expert guidance.",
      hoverDescription:
        "Connect with owners or seekers to easily buy, rent, or find the best vehicles.",
    },
  ],
  room: [
    {
      id: 1,
      icon: Truck,
      buttonTitle: "Book Shifter",
      title: "Room Shifting Assistance",
      description:
        "Professional room shifting with secure packing, careful furniture handling, and organized transport of belongings",
      hoverDescription:
        "Complete shifitng service ensuring appliances setup, furniture arrangement, and safe delivery to your new room",
    },
    {
      id: 2,
      icon: Package,
      buttonTitle: "Book Carrier",
      title: "Store to Door Delivery",
      description:
        "Convenient delivery service from stores to your door for heavy items like washing machines, fridges, ACs, and more",
      hoverDescription:
        "Professional transport of bulky goods from store to home, ensuring careful handling, secure delivery, and timely arrival of items",
    },
    {
      id: 3,
      icon: Wrench,
      title: "Room Setup",
      buttonTitle: "Hire Helper",
      description:
        "Efficient room care including packing, unpacking, deep cleaning, and organizing all your personal belongings",
      hoverDescription:
        "On-demand room support with systematic unpacking, cleaning, arranging items, and keeping your space neat and organized",
    },
  ],
  property: [
    {
      id: 1,
      icon: HandHeart,
      buttonTitle: "Hire Broker",
      title: "Property Broker Assistance",
      description:
        "Hire expert property brokers providing full support for buying and selling properties efficiently and securely",
      hoverDescription:
        "Professional brokers handling negotiations, legal documents, registrations, and all steps for smooth property sales",
    },
    {
      id: 2,
      icon: Truck,
      buttonTitle: "Book Shifter",
      title: "Property Shifting Assistance",
      description:
        "Complete property relocation including packing, furniture handling, and safe transport of household goods and appliances",
      hoverDescription:
        "Full-scale shifting services covering appliances, furniture, and personal items with careful handling and timely delivery",
    },
  ],
  vehicle: [
    {
      id: 1,
      icon: HandHeart,
      buttonTitle: "Hire Broker",
      title: "Vehicle Broker Assistance",
      description:
        "Trusted vehicle brokers assisting with buying and selling vehicles quickly and at fair market prices",
      hoverDescription:
        "Professional brokers providing market knowledge, price evaluation, legal documentation, and smooth transaction support",
    },
    // {
    //   id: 2,
    //   icon: Truck,
    //   buttonTitle: "Book Transport",
    //   title: "Vehicle Transportation",
    //   description:
    //     "Safe and reliable vehicle shifting and transportation services for cars, bikes, and other vehicles",
    //   hoverDescription:
    //     "Professional vehicle transport with secure loading, GPS tracking, insurance coverage, and timely delivery",
    // },
    // {
    //   id: 3,
    //   icon: Wrench,
    //   buttonTitle: "Book Service",
    //   title: "Vehicle Servicing & Maintenance",
    //   description:
    //     "On-demand vehicle servicing including cleaning, routine maintenance, and minor repairs at your convenience",
    //   hoverDescription:
    //     "Professional vehicle care with doorstep pickup, servicing, cleaning, and timely return to ensure optimal condition",
    // },
    // {
    //   id: 4,
    //   icon: Package,
    //   buttonTitle: "Book Delivery",
    //   title: "Vehicle Delivery Services",
    //   description:
    //     "Secure pickup and delivery of vehicles for purchases, repairs, or relocations with careful handling",
    //   hoverDescription:
    //     "Reliable vehicle transport services including loading, delivery, tracking, and insurance coverage for peace of mind",
    // },
  ],
  general: [],
};

const categoryTitleMap: Record<Category, string> = {
  general: "Services",
  room: "Room Services",
  listing: "Listing Services",
  vehicle: "Vehicle Services",
  property: "Property Services",
};

const categoryDescriptionMap: Record<Category, string> = {
  vehicle:
    "Complete vehicle services in Nepal, including expert buying and selling support, professional brokerage, reliable maintenance, secure transportation, and safe delivery",
  property:
    "Comprehensive property solutions, providing professional brokerage, property shifting, management services, and expert guidance for buying, selling, and investing in homes and lands",
  listing:
    "Professional listing services connecting verified clients for rooms, houses, hostels, lands, and vehicles, offering reliable support for both owners and seekers",
  general:
    "Full-service moving and delivery solutions, including expert home and office shifting, store-to-door delivery, and on-demand professional helpers for all relocation needs",
  room: "Complete room services covering finding, packing, cleaning, organizing, and tenant management, with expert assistance to ensure smooth and efficient operations",
};
// const categoryDescriptionMap: Record<Category, string> = {
//   vehicle:
//     "Complete vehicle solutions - from buying/selling to transportation and delivery services",
//   property:
//     "Expert property solutions - from broker services to property management and investment guidance",
//   listing:
//     "Expert listing services - connect with the right clients for your properties, rooms, and vehicles",
//   general:
//     "Your complete moving and delivery solution in Nepal - from expert shifting services to on-demand help",
//   room: "Complete room solutions - from finding perfect rooms to moving, cleaning, and tenant management services",
// };

const getCategoryDescription = (category: Category) =>
  categoryDescriptionMap[category];
const getCategoryTitle = (category: Category) => categoryTitleMap[category];
const getServicesForCategory = (category: Category) => serviceMap[category];

const ServiceSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("listing");

  const services = getServicesForCategory(selectedCategory);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-3">
            Explore AfnoSansaar {getCategoryTitle(selectedCategory)}
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            {getCategoryDescription(selectedCategory)}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center bg-slate-100 rounded-lg border border-green-300">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 m-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-green-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const IconComponent = service.icon;
            const isHovered = hoveredCard === service.id;

            return (
              <Card
                key={service.id}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseEnter={() => setHoveredCard(service.id)}
                className="relative p-4 rounded-xl border-green-300 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden"
              >
                <div className="w-10 mx-auto h-10 rounded-lg mb-2 flex items-center justify-center transition-all duration-300 ease-in-out bg-green-100">
                  <IconComponent className="w-5 h-5 transition-all duration-500 ease-in-out hover:scale-110 text-green-600" />
                </div>

                <h3 className="font-semibold text-sm mb-2 transition-all duration-300 ease-in-out text-slate-800">
                  {service.title}
                </h3>

                <p className="text-green-600 text-xs font-mono mb-2 leading-relaxed transition-all duration-300 ease-in-out">
                  {isHovered ? service.hoverDescription : service.description}
                </p>

                <button className="w-full font-medium rounded-md p-1 bg-green-100 shadow-sm flex items-center justify-center group transition-all">
                  {service.buttonTitle}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-all" />
                </button>
              </Card>
            );
          })}
        </div>

        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {services.map((service) => {
              const IconComponent = service.icon;
              const isHovered = hoveredCard === service.id;

              return (
                <Card
                  key={service.id}
                  onMouseLeave={() => setHoveredCard(null)}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  className="relative p-4 border-green-300 rounded-xl border transition-all duration-300 ease-in-out cursor-pointer overflow-hidden flex-shrink-0 w-64"
                >
                  <div className="w-10 mx-auto h-10 rounded-lg mb-2 flex items-center justify-center transition-all duration-300 ease-in-out bg-green-100">
                    <IconComponent className="w-5 h-5 hover:scale-110 transition-all duration-300 ease-in-out text-green-600" />
                  </div>

                  <h3 className="font-semibold text-sm mb-2 transition-all duration-300 ease-in-out text-slate-800">
                    {service.title}
                  </h3>

                  <p className="text-green-600 text-xs font-mono mb-2 leading-relaxed transition-all duration-300 ease-in-out">
                    {isHovered ? service.hoverDescription : service.description}
                  </p>

                  <button className="w-full font-medium rounded-md p-1 bg-green-100 shadow-sm flex items-center justify-center group transition-all">
                    {service.buttonTitle}
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-all" />
                  </button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
