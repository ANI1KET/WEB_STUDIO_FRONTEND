"use server";

import { Permission } from "@prisma/client";

import axiosInstance from "@/app/lib/axiosInstance";
import { PromotionData } from "../types/PromotionCard";
import { baseUserUrl } from "@/app/common/endPoints/user";
import { getAutheticationHeader } from "@/app/common/serverAction/header";

export const promotionData = async (
  service: Permission | null
): Promise<PromotionData> => {
  "use server";

  const { data } = await axiosInstance.get(
    `${baseUserUrl}/${service}-promotion`,
    await getAutheticationHeader()
  );
  return data;
};

export const createPromotionData = async (
  data: PromotionData,
  service: Permission | null
) => {
  "use server";

  await axiosInstance.post(
    `${baseUserUrl}/${service}-promotion`,
    data,
    await getAutheticationHeader()
  );
};

export const updatePromotionData = async (
  data: PromotionData,
  service: Permission | null
) => {
  "use server";

  await axiosInstance.put(
    `${baseUserUrl}/${service}-promotion`,
    data,
    await getAutheticationHeader()
  );
};

export const deletePromotionData = async (
  service: Permission | null
): Promise<void> => {
  "use server";

  await axiosInstance.delete(
    `${baseUserUrl}/${service}-promotion`,
    await getAutheticationHeader()
  );
};
