import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/prisma/prismaClient";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          type: "text",
          label: "Email",
          placeholder: "Email",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("Please enter email and password");
        }

        try {
          const user = await prisma.eventUser.findUnique({ where: { email } });

          if (!user) {
            throw new Error("User not found, Create your account.");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect email/number or password");
          }

          const { id, name, role, email: userEmail } = user;

          return {
            id,
            name,
            role,
            email: userEmail,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (user) {
        Object.assign(token, {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
        });
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session.user, {
        id: token.id,
        role: token.role,
      });

      return session;
    },
  },
};
