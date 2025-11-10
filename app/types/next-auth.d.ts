import "next-auth";
import { DefaultSession } from "next-auth";
import { Gender, Permission, Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    // _id?: string;
    age?: number;
    role?: string;
    gender?: Gender;
    userId?: string;
    number?: string;
    address?: string;
    documentId?: string;
    promoting?: Permission[];
    permission?: Permission[];
    servicesOffered?: Permission[];
  }
  interface Session {
    user: {
      id?: string;
      role?: Role;
      age?: number;
      userId?: string;
      number?: string;
      gender?: Gender;
      address?: string;
      documentId?: string;
      access_token?: string;
      refresh_token?: string;
      promoting?: Permission[];
      permission?: Permission[];
      servicesOffered?: Permission[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userId?: string;
    access_token?: string;
    refresh_token?: string;
  }
}
