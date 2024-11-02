// lib/auth.js
import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { verifyUserCredentials } from '../../../lib/auth'; // custom function to validate user this will come from me
import dotenv from 'dotenv';
dotenv.config()

export const authOptions = {
  providers: [
    // regular form user/password authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        // Here you would typically fetch user from your database
        // const user = await verifyUserCredentials(credentials.email, credentials.password);

        // Check if the username and password match
        if (credentials.email === user.email && credentials.password === user.password) {
          return user; // Return user object if login is successful
        } else {
          return null; // Return null if login fails
        }
      },
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>',
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  // custom signIn page
  pages: {
    signIn: '/auth/signin'
  },

  // Additional options can be defined here, callbacks and others
  secret: process.env.NEXTAUTH_SECRET,
};
