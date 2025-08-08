"use client";

import React, { useState } from "react";
import { Permission } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  promotionData,
  createPromotionData,
  updatePromotionData,
  deletePromotionData,
} from "./ServerAction/PromotionCard";
import { PromotionData } from "./types/PromotionCard";
import { useToast } from "@/app/common/hooks/use-toast";
import { promotionItems } from "@/app/common/config/listings";

import PromotionItem from "./PromotionCard/PromotionItem";
import PromotionPricing from "./PromotionCard/PromotionPricing";
import PromotionCardHeader from "./PromotionCard/PromotionCardHeader";

interface PromotionCardProps {
  userPermissions: Permission[];
}

const PromotionCard = ({ userPermissions }: PromotionCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: session, update } = useSession();

  const [editingPromotion, setEditingPromotion] = useState<Permission | null>(
    null
  );

  const userPromotions = session?.user.promoting ?? [];
  const isPromotionExist =
    !!editingPromotion && userPromotions.includes(editingPromotion);
  const { data } = useQuery<PromotionData>({
    queryKey: ["user_promotion", editingPromotion],
    queryFn: () => promotionData(editingPromotion),
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: isPromotionExist,
  });

  const handlePromotionToggle = async (
    permissionId: Permission,
    enabled: boolean
  ) => {
    if (enabled) {
      if (!session?.user.number) {
        return toast({
          variant: "destructive",
          title: "❌ Missing Contact",
          description: "Please set your number to activate promotion.",
        });
      }

      setEditingPromotion(permissionId);
    } else {
      try {
        await deletePromotionData(permissionId);

        await update({
          ...session,
          user: {
            ...session?.user,
            promoting: session?.user.promoting?.filter(
              (promote) => promote != permissionId
            ),
          },
        });

        // queryClient.removeQueries({
        //   queryKey: ["user_promotion", permissionId],
        // });

        setEditingPromotion(null);

        toast({
          title: "🛑 Promotion Stopped",
          description: `${permissionId} promotion has been deactivated.`,
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "❌ Failed to deactivate promotion",
          description: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }
  };

  const handleEditPromotion = (permissionId: Permission) => {
    setEditingPromotion(permissionId);
  };

  const handleSubmit = async (permissionId: Permission, price: number) => {
    try {
      if (isPromotionExist) {
        await updatePromotionData({ pricePerClick: price }, permissionId);

        toast({
          title: "🚀 Promotion Updated!",
          description: `${permissionId} promotion set to NPR ${price}/click.`,
        });
      } else {
        await createPromotionData({ pricePerClick: price }, permissionId);

        await update({
          ...session,
          user: {
            ...session?.user,
            promoting: [...(session?.user.promoting || []), permissionId],
          },
        });

        toast({
          title: "🚀 Promotion Created!",
          description: `${permissionId} promotion set to NPR ${price}/click.`,
        });
      }

      queryClient.setQueryData<PromotionData>(
        ["user_promotion", permissionId],
        (prev) => ({
          ...prev,
          pricePerClick: price,
        })
      );

      setEditingPromotion(null);
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
      <PromotionCardHeader />

      <div className="space-y-4">
        {promotionItems.map((promotion) => {
          const id = promotion.id;
          const name = promotion.name;
          return (
            <div key={id}>
              <PromotionItem
                promotion={promotion}
                onEditPromotion={handleEditPromotion}
                canPromote={userPermissions.includes(id)}
                onPromotionToggle={handlePromotionToggle}
                isPromoting={session?.user.promoting?.includes(id) || false}
              />

              {editingPromotion === id && (
                <div className="mt-3">
                  <PromotionPricing
                    permissionId={id}
                    permissionName={name}
                    onConfirm={handleSubmit}
                    isPromotionExist={isPromotionExist}
                    currentPrice={data?.pricePerClick ?? 0}
                    onCancel={() => setEditingPromotion(null)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromotionCard;
