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
  // SignIn and or register with google account
  callbacks: {
    async signIn({user, account, profile}) {
      // console.log('user-----', user.user.email);
      // console.log('user-----', user.user);
      // Check if the user already exists in your database
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // display signup Page if there is no user registered with this email 
        return false;
      }
      user.empresa = existingUser.empresa;
      user._id = existingUser._id.toString();

      console.log('user after empresa added', user);

      return true; // Return true to indicate successful sign-in
    },
    async jwt({ token, user }) {
      // The user object is only passed on the first call to jwt
      // subsequent calls will only receive the token
      if (user) {
        token.empresa = user.empresa;
        token._id = user._id
      }
      return token;
    },
    async session({ session, token }) {
      // Add empresa from token to the session
      session.user.empresa = token.empresa;
      session.user._id = token._id;
      return session;
    },
  },
  // Additional options can be defined here, callbacks and others
  secret: process.env.NEXTAUTH_SECRET,
};
