import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    // _id?: string;
    role?: string;
  }
  interface Session {
    user: {
      id?: string;
      role?: Role;
      number?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    access_token?: string;
    refresh_token?: string;
  }
}
