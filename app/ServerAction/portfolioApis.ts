"use server";

import axiosInstance from "../lib/axiosInstance";
import { getAutheticationHeader } from "../lib/header";

export interface PortfolioEvent {
  id: string;
  slug: string;
  date: string;
  title: string;
  location: string;
  eventType: string;
  reviewText?: string;
  isFeatured: boolean;
  shortSummary: string;
  coverImageUrl: string;
  fullDescription: string;
  galleryImages: string[];
}

export const getAllEvent = async (): Promise<PortfolioEvent[]> => {
  const { data } = await axiosInstance.get("portfolio");
  return data;
};

export const getBySlugEvent = async (
  slug: string
): Promise<PortfolioEvent | undefined> => {
  const { data } = await axiosInstance.get(`portfolio/${slug}`);
  return data;
};

export const registerEvent = async (
  event: Omit<PortfolioEvent, "id">
): Promise<PortfolioEvent> => {
  const { data } = await axiosInstance.post(
    "portfolio",
    event,
    await getAutheticationHeader()
  );
  return data;
};

export const modifyEvent = async (
  id: string,
  event: Omit<PortfolioEvent, "id">
): Promise<PortfolioEvent> => {
  const { data } = await axiosInstance.patch(
    `portfolio/${id}`,
    event,
    await getAutheticationHeader()
  );
  return data;
};

export const removeEvent = async (id: string): Promise<void> => {
  await axiosInstance.delete(`portfolio/${id}`, await getAutheticationHeader());
};
