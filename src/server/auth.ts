import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcrypt";

import { db } from "~/server/db";
import { routes } from "~/misc/routes";
import { loginSchema } from "./api/routers/schemas/user";

interface UserRole {
  admin: "admin";
  user: "user";
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: UserRole;
    } & DefaultSession["user"];
  }
}

const adapter = PrismaAdapter(db);

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: routes.login,
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },

    signIn: async ({ user }) => {
      const isAllowedToSignIn = !!user;

      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Hasło", type: "password" },
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password)
          return Promise.reject(new Error("Brak hasła lub adresu e-mail."));
        const creds = await loginSchema.parseAsync(credentials);

        const user = await db.user.findFirst({
          where: { email: creds.email },
        });

        if (!user)
          return Promise.reject(
            new Error("Użytkownik o tym adresie e-mail nie istnieje."),
          );

        const isValidPassword = await bcrypt.compare(
          creds.password,
          user.password,
        );

        if (!isValidPassword)
          return Promise.reject(new Error("Dane sa niepoprawne."));

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
