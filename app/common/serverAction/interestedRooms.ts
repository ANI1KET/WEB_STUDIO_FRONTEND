"use server";

import axios from "axios";

import {
  getInterestedRoomsUrl,
  deleteInterestedRoomsPerUserUrl,
  deleteInterestedRoomPerListerUrl,
  deleteInterestedRoomsPerListerUrl,
} from "@/app/common/endPoints/user";
import axiosInstance from "@/app/lib/axiosInstance";
import { InterestedRooms, ListedRoom } from "@/app/types/types";
import { getListerInterestedRoomsUrl } from "../endPoints/room";
import { getAutheticationHeader } from "@/app/common/serverAction/header";

export async function getInterestedRooms(): Promise<InterestedRooms[]> {
  try {
    const { data } = await axiosInstance.get(
      getInterestedRoomsUrl,
      await getAutheticationHeader()
    );

    return data;
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function getListerInterestedRooms(
  roomIds: string[]
): Promise<ListedRoom[]> {
  try {
    const { data } = await axiosInstance.post(
      getListerInterestedRoomsUrl,
      { roomIds },
      await getAutheticationHeader()
    );

    return data;
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function deleteInterestedRoomPerLister(
  id: string,
  roomId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await axiosInstance.put(
      deleteInterestedRoomPerListerUrl,
      { id, roomId },
      await getAutheticationHeader()
    );

    return data;
  } catch (error) {
    let errorMessage = "Unable to remove room. Try again later.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { success: false, message: errorMessage };
  }
}

export async function deleteInterestedRoomsPerLister(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await axiosInstance.delete(
      `${deleteInterestedRoomsPerListerUrl}/${id}`,
      await getAutheticationHeader()
    );

    return data;
  } catch (error) {
    let errorMessage = "Unable to remove this lister rooms. Try again later.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { success: false, message: errorMessage };
  }
}

export async function deleteInterestedRoomsPerUser(): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    const { data } = await axiosInstance.delete(
      `${deleteInterestedRoomsPerUserUrl}`,
      await getAutheticationHeader()
    );

    return data;
  } catch (error) {
    let errorMessage =
      "Unable to remove all your interested rooms. Try again later.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { success: false, message: errorMessage };
  }
}
