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
          let user = null
  
          const { email, password } = await SignInSchema.parseAsync(credentials)
   
          // user = await User.findOne()
   
          if (!user) {
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.")
          }
   
          // return user object with their profile data
          return { email, password }
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    })
  ],
})