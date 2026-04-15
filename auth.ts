import NextAuth, { DefaultSession, User } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

import { UserRole } from "@prisma/client";
import { getUserById } from "./data/user";
import {
  getDoctorByuserId,
  getNurseByuserId,
  getPatientByuserId,
  getStaffByuserId,
} from "./data/userProfile";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  //update
} = NextAuth({
  pages: {
    signIn: "/",
    error: "/",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Alow Oauth without email verification
      if (account?.provider !== "credentials") return true;

      return true;
    },
    async session({ token, session }) {
      // console.log({ Sessiontoken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      // for setting page
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        // for checking Oauth
        // session.user.isOAuth = token.isOAuth as boolean;
      }
      if (token.profile && session.user) {
        session.user.profile = token.profile;
      }

      // console.log({ session });
      return session;
    },
    async jwt({ token }) {
      // console.log("I AM BEING CALLED AGAINs");
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      const patientdata = await getPatientByuserId(token.sub);
      const staffdata = await getStaffByuserId(token.sub);
      const docdata = await getDoctorByuserId(token.sub);
      const nursedata = await getNurseByuserId(token.sub);
      if (!existingUser) return token;
      if (existingUser.role === UserRole.DOCTOR) {
        token.profile = docdata;
      }
      if (existingUser.role === UserRole.NURSE) {
        token.profile = nursedata;
      }

      if (existingUser.role === UserRole.STAFF) {
        token.profile = staffdata;
      }
      if (existingUser.role === UserRole.PATIENT) {
        token.profile = patientdata;
      }
      // for checking Oauth
      // const existingAccount = await getAccountByuserId(existingUser.id);
      // console.log({ existingAccount });
      //token.isOAuth = !!existingAccount;
      // console.log(!!existingAccount);
      // console.log(existingAccount);
      // for checking Oauth
      //for seetting page
      token.name = existingUser.name;
      token.email = existingUser.email;
      //for seetting page
      token.role = existingUser.role;

      //token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
