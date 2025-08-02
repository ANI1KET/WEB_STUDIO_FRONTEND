"use client";

import { useForm } from "react-hook-form";
import { Permission } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Home, Building, Car, LucideProps } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  serviceData,
  updateServiceData,
  createServiceData,
  deleteServiceData,
} from "./ServerAction/ListingServiceCard";
import { useToast } from "@/app/common/hooks/use-toast";
import { ServiceData } from "./types/ListingServiceCard";

import CitiesSection from "./ListingServiceCard/CitiesSection";
import PricingSection from "./ListingServiceCard/PricingSection";
import LanguagesSection from "./ListingServiceCard/LanguagesSection";
import ListingServiceItem from "./ListingServiceCard/ListingServiceItem";
import ListingServiceCardHeader from "./ListingServiceCard/ListingServiceCardHeader";

interface ListingServiceCardProps {
  userPermissions: Permission[];
}

const ListingServiceCard = ({ userPermissions }: ListingServiceCardProps) => {
  const services: Record<
    Permission,
    {
      name: string;
      id: Permission;
      icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
    }
  > = {
    room: {
      icon: Home,
      id: "room",
      name: "Room Listing Service",
    },
    property: {
      icon: Building,
      id: "property",
      name: "Property Listing Service",
    },
    vehicle: {
      icon: Car,
      id: "vehicle",
      name: "Vehicle Listing Service",
    },

    //----------//

    hostel: {
      icon: Car,
      id: "hostel",
      name: "Hostel Listings",
    },
    reMarketItem: {
      icon: Car,
      id: "vehicle",
      name: "Vehicle Listings",
    },
  };

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: session, update } = useSession();

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Permission | null>(null);

  const userServices = session?.user.servicesOffered ?? [];
  const isServiceExist =
    !!editingService && userServices.includes(editingService);
  const { data } = useQuery<ServiceData>({
    queryKey: ["user_listing", editingService],
    queryFn: () => serviceData(editingService),
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: isServiceExist,
  });

  const { setValue, getValues, handleSubmit, reset } = useForm<ServiceData>({
    defaultValues: {
      virtualPrice: 0,
      physicalPrice: 0,
      supportedCities: [],
      supportedLanguages: [],
    },
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const handleServiceToggle = async (
    serviceId: Permission,
    enabled: boolean
  ) => {
    if (enabled) {
      setEditingService(serviceId);
    } else {
      try {
        await deleteServiceData(serviceId);

        await update({
          ...session,
          user: {
            ...session?.user,
            servicesOffered: session?.user.servicesOffered?.filter(
              (service) => service != serviceId
            ),
          },
        });

        // queryClient.removeQueries({
        //   queryKey: ["user_listing", serviceId],
        // });

        setEditingService(null);

        toast({
          title: "🛑 Service Stopped",
          description: `${serviceId} listing service has been deactivated.`,
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "❌ Failed to deactivate service",
          description: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }
  };

  const handleEditService = (serviceId: Permission) => {
    setEditingService(serviceId);
  };

  const onSubmit = async (formData: ServiceData) => {
    if (!formData.supportedCities?.length) {
      return toast({
        variant: "destructive",
        title: "Missing Cities",
        description: "Select at least one city.",
      });
    }

    if (!formData.supportedLanguages?.length) {
      return toast({
        variant: "destructive",
        title: "Missing Languages",
        description: "Select at least one supported language.",
      });
    }

    try {
      if (isServiceExist) {
        await updateServiceData(formData, editingService);

        toast({
          title: `🚀 ${editingService} Listing Service`,
          description: `${editingService} listing service updated successfully.`,
        });
      } else {
        await createServiceData(formData, editingService as Permission);

        await update({
          ...session,
          user: {
            ...session?.user,
            servicesOffered: [
              ...(session?.user.servicesOffered || []),
              editingService,
            ],
          },
        });

        toast({
          title: `🚀 ${editingService} Listing Service`,
          description: `${editingService} listing service is activated.`,
        });
      }

      queryClient.setQueryData<ServiceData>(
        ["user_listing", editingService],
        (prev) => ({
          ...prev,
          virtualPrice: formData.virtualPrice,
          physicalPrice: formData.physicalPrice,
          supportedCities: formData.supportedCities,
          supportedLanguages: formData.supportedLanguages,
        })
      );

      setEditingService(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Update Failed",
        description: "There was an error updating the service data.",
      });
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-green-200 p-4 transition-all duration-300 hover:shadow-xl">
      <ListingServiceCardHeader />

      <div className="space-y-6">
        {/* Service Items */}
        <div className="space-y-4">
          {userPermissions.map((service) => {
            const id = services[service].id;
            const name = services[service].name;
            const isServiceOffered =
              session?.user.servicesOffered?.includes(service) || false;
            return (
              <div key={id}>
                <ListingServiceItem
                  service={services[service]}
                  isProviding={isServiceOffered}
                  onEditService={handleEditService}
                  onServiceToggle={handleServiceToggle}
                />

                {editingService === id && (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 space-y-4 p-4 bg-white rounded-lg border-2 border-blue-200"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">
                        Edit {name}
                      </h4>

                      <button
                        onClick={() => {
                          reset(data);
                          setEditingService(null);
                        }}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                      >
                        x
                      </button>
                    </div>

                    <PricingSection
                      setValue={setValue}
                      editingField={editingField}
                      onEditStart={setEditingField}
                      virtualPrice={getValues("virtualPrice")}
                      physicalPrice={getValues("physicalPrice")}
                    />

                    <LanguagesSection
                      setValue={setValue}
                      editingField={editingField}
                      onEditStart={setEditingField}
                      languages={getValues("supportedLanguages")}
                    />

                    <CitiesSection
                      setValue={setValue}
                      editingField={editingField}
                      onEditStart={setEditingField}
                      cities={getValues("supportedCities")}
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-green-200 to-emerald-200 border-green-400 shadow-xl rounded-sm font-semibold hover:scale-[1.01]"
                      >
                        {isServiceOffered
                          ? "Update Changes"
                          : `Activate ${service} listing service`}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListingServiceCard;
