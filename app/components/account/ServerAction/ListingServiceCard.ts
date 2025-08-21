"use server";

import { Permission } from "@prisma/client";

import axiosInstance from "@/app/lib/axiosInstance";
import { baseUserUrl } from "@/app/common/endPoints/user";
import { ServiceData } from "../types/ListingServiceCard";
import { getAutheticationHeader } from "@/app/common/serverAction/header";

export const serviceData = async (
  service: Permission | null
): Promise<ServiceData> => {
  "use server";

  const { data } = await axiosInstance.get(
    `${baseUserUrl}/${service}-service`,
    await getAutheticationHeader()
  );
  return data;
};

export const createServiceData = async (
  data: ServiceData,
  service: Permission
) => {
  // ): Promise<ServiceData> => {
  "use server";

  // const response =
  await axiosInstance.post(
    `${baseUserUrl}/${service}-service`,
    data,
    await getAutheticationHeader()
  );
  // return response.data;
};

export const updateServiceData = async (
  data: ServiceData,
  service: Permission
) => {
  // ): Promise<ServiceData> => {
  "use server";

  // const response =
  await axiosInstance.put(
    `${baseUserUrl}/${service}-service`,
    data,
    await getAutheticationHeader()
  );
  // return response.data;
};

export const deleteServiceData = async (service: Permission): Promise<void> => {
  "use server";

  await axiosInstance.delete(
    `${baseUserUrl}/${service}-service`,
    await getAutheticationHeader()
  );
};
