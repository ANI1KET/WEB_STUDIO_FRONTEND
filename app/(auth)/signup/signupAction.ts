"use server";

import bcrypt from "bcryptjs";

import prisma from "@/prisma/prismaClient";
import { EMAIL_VALIDATION } from "../../lib/constants";

export const signUp = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  "use server";

  if (!email || !password || !name) {
    throw new Error("All fields are required");
  }

  if (!EMAIL_VALIDATION.test(email)) {
    throw new Error("Invalid email format");
  }

  const existing = await prisma.eventUser.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.eventUser.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      role: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};
