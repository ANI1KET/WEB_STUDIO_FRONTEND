"use client";

import React from "react";
import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/app/components/ui/card";

const EmptyRoomsState = () => {
  const suggestions = [
    {
      link: "/",
      icon: Search,
      title: "Discover Areas",
      description: "Explore available rooms in your preferred locations",
    },
  ];

  return (
    <div className="text-center">
      <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg hover:shadow-2xl">
        <CardContent className="py-6">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Home className="w-12 h-12 text-green-600" />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                No Rooms Saved Yet
              </h3>

              <p className="text-gray-600 max-w-md mx-auto">
                Start exploring and save rooms that catch your interest.
                <br />
                Build your personalized collection of potential homes.
              </p>
            </div>
          </div>

          <div className="w-1/2 mx-auto">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <Link key={index} href={suggestion.link}>
                  <Card className="group hover:shadow-md transition-all duration-300 border-gray-200 hover:border-green-300 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center mb-2">
                        <span className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                          <Icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                        </span>
                      </div>

                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {suggestion.title}
                      </h4>

                      <p className="text-sm text-gray-600 mb-3">
                        {suggestion.description}
                      </p>

                      <div className="flex justify-center text-sm group-hover:bg-green-200 p-1 rounded-md text-green-600 font-medium">
                        <span>Get Started</span>

                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyRoomsState;
