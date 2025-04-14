// auth.ts

import NextAuth from "next-auth"
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db/config"
import Resend from "next-auth/providers/resend"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "./lib/zod";
import { ZodError } from "zod";
import { User } from "./models/User";
import { connectToMongoDb } from "./lib/db/connect";
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google,
    Resend,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const password = credentials?.password;
          const email = credentials?.email;
          const phone = credentials?.phone;

          // Handle identifier (either email or phone)
          const identifier = email || phone;

          if (
            !password ||
            typeof password !== "string"
          ) {
            console.error("Invalid password format", {
              password,
            });
            return null;
            
          }

          // Zod safeParse
          const parsedData = await SignInSchema.safeParseAsync({
            email,
            phone,
            password,
          });

          if (!parsedData.success) {
            console.error("Zod validation failed", parsedData.error);
            return null;
          }

          await connectToMongoDb();

          const user = await User.findOne({
            $or: [{ email }, { phone }],
          });

          if (!user || typeof user.password !== "string") {
            console.error("User not found or password is not a string");
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordCorrect) {
            console.error("Incorrect password");
            return null;
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) return null;
          throw error;
        }
      },

    })
  ],
})