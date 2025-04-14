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

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google,
    Resend,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await SignInSchema.parseAsync(credentials);

          await connectToMongoDb();

          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }
          
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw error;
        }
      },
    })
  ],
})