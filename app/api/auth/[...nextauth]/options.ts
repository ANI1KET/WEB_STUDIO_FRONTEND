import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/prisma/prismaClient";
import { NEPALI_NUMBERS_VALIDATION } from "@/app/lib/constants";

const isProd = process.env.NODE_ENV === "production";
export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: '/login',
  // },
  cookies: {
    sessionToken: {
      name: isProd
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        path: "/",
        secure: isProd,
        httpOnly: true,
        sameSite: "lax",
        domain: isProd ? ".aniketrouniyar.com.np" : undefined,
      },
    },
    // callbackUrl: {
    //   name: isProd
    //     ? '__Secure-next-auth.callback-url'
    //     : 'next-auth.callback-url',
    //   options: {
    //     sameSite: 'lax',
    //     path: '/',
    //     secure: isProd,
    //     ...(isProd && { domain: '.aniketrouniyar.com.np' }),
    //   },
    // },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        path: "/",
        secure: isProd,
        httpOnly: false,
        sameSite: "lax",
        domain: isProd ? ".aniketrouniyar.com.np" : undefined,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours for session expiry (cookie will follow this setting)
    // updateAge: 6 * 60 * 60, // touch session every 6h
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours maxAge for JWT specifically
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: {
      //   params: {
      //     scope:
      //       // "openid profile email https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/youtube.upload",
      //       'openid profile email https://www.googleapis.com/auth/drive.file',
      //     access_type: 'offline',
      //     prompt: 'consent',
      //   },
      // },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: {
          type: "text",
          label: "Email or Number",
          placeholder: "Email or Number",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Password",
        },
      },
      // async authorize(credentials, req) {
      async authorize(credentials) {
        const { identifier, password } = credentials ?? {};

        if (!identifier || !password) {
          throw new Error("Please enter email/number and password");
        }

        const isNumber = NEPALI_NUMBERS_VALIDATION.test(identifier);

        try {
          const user = await prisma.user.findFirst({
            where: isNumber ? { number: identifier } : { email: identifier },
          });

          if (!user) {
            throw new Error("User not found, Create your account.");
          }

          if (!user.password) {
            throw new Error("Password not set. Please set it to log in.");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect email/number or password");
          }

          const {
            id,
            age,
            name,
            role,
            email,
            gender,
            number,
            address,
            promoting,
            permission,
            documentId,
            servicesOffered,
          } = user;

          return {
            id,
            name,
            role,
            email,
            promoting,
            permission,
            servicesOffered,
            age: age ?? undefined,
            gender: gender ?? undefined,
            number: number ?? undefined,
            address: address ?? undefined,
            documentId: documentId ?? undefined,
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
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        try {
          // Use `upsert` to handle creation or no action if user exists
          const userDetails = await prisma.user.upsert({
            where: { email: user.email as string },
            update: {},
            create: {
              image: user.image,
              name: user.name as string,
              email: user.email as string,
            },
          });

          Object.assign(user, {
            age: userDetails.age,
            role: userDetails.role,
            userId: userDetails.id,
            number: userDetails.number,
            gender: userDetails.gender,
            address: userDetails.address,
            promoting: userDetails.promoting,
            permission: userDetails.permission,
            documentId: userDetails.documentId,
            servicesOffered: userDetails.servicesOffered,
          });

          return true;
        } catch (error) {
          console.error("Error signing in user:", error);
          return false;
        }
      }

      return true;
    },
    // async redirect({ baseUrl, url }) {
    //   console.log('! ', url);
    //   const callbackUrl = new URLSearchParams(url).get('callbackUrl');
    //   console.log('!! ', callbackUrl);
    //   const redirectUrl = callbackUrl
    //     ? decodeURIComponent(callbackUrl)
    //     : baseUrl;
    //   console.log('!!! ', redirectUrl);

    //   return redirectUrl;
    // },
    async jwt({ user, token, trigger, session }) {
      if (user) {
        Object.assign(token, {
          id: user.id,
          age: user.age,
          name: user.name,
          role: user.role,
          email: user.email,
          number: user.number,
          userId: user.userId,
          gender: user.gender,
          address: user.address,
          promoting: user.promoting,
          permission: user.permission,
          documentId: user.documentId,
          servicesOffered: user.servicesOffered,
        });

        // if (account?.provider === 'google') {
        //   token.refresh_token = account.refresh_token;
        //   token.access_token = account.access_token;
        // }
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session.user, {
        id: token.id,
        age: token.age,
        role: token.role,
        userId: token.userId,
        number: token.number,
        gender: token.gender,
        address: token.address,
        promoting: token.promoting,
        documentId: token.documentId,
        permission: token.permission,
        servicesOffered: token.servicesOffered,
        // access_token: token?.access_token,
        // refresh_token: token?.refresh_token,
      });

      return session;
    },
  },
};
