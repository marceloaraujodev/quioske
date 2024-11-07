// lib/auth.js
// import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/users";
import { handleError, createError } from "../utils/errorHandler";
import { checkPassword } from "../utils/hashAndCheckPassword";
import dotenv from "dotenv";

dotenv.config();

export const authOptions = {
  providers: [
    // regular form user/password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        console.log("credentials autorize async", credentials);
        try {
          const user = await User.findOne({ email: credentials.email });
          console.log("user inside authorize credentials", user);
          if (!user) {
            return null;
          }

          const isValidPassword = await checkPassword(credentials.password, user.password);
          if (!isValidPassword) {
            createError(400, "Invalid password")
          }
          return user;
        } catch (error) {
          handleError(error);
        }
      },
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "email profile",
        },
      },
    }),
  ],
  pages: {
    // redirects to the login page and changes 
    error: '/'
  },
  // // custom signIn page
  // pages: {
  //   signIn: '/auth/signin'
  // },
  // SignIn and or register with google account
  callbacks: {
    async signIn(user, account, profile) {
      // console.log('user-----', user.user.email);
      // console.log('user-----', user.user);
      // Check if the user already exists in your database
      const existingUser = await User.findOne({ email: user.user.email });

      if (!existingUser) {
        // display signup Page if there is no user registered with this email 
        return false;
      } else {
        // If the user exists, you can update their last login time or other fields if needed
        user.id = existingUser._id; // Set the user ID for session
      }

      return true; // Return true to indicate successful sign-in
    },
    async session(session, user) {
      if (user && user._id) {
        user.id = user._id;
        user.empresa = existingUser.empresa
      }
      // Attach user ID to the session
      return session;
    },
  },
  // Additional options can be defined here, callbacks and others
  secret: process.env.NEXTAUTH_SECRET,
};
