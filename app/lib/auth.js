// lib/auth.js
import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../models/users';
import { checkPassword } from '../utils/hashAndCheckPassword';
import { handleError, createError } from '../utils/errorHandler';
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
        try {
          const user = await User.findOne({ email: credentials.email});
          if(!user){
            return null;
          }
          const isValidPassword = await checkPassword(credentials.password, user.password);
          if(!isValidPassword){
            
            return null;
          }
          return user;
        } catch (error) {
          handleError(error);
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
      authorization: {
        params: {
          scope: 'email profile'
        }
      }
    })
  ],
  // // custom signIn page
  // pages: {
  //   signIn: '/auth/signin'
  // },
  // signIn and register with google account
  callbacks: {
    async signIn(user, account, profile) {
      console.log('user-----', user.user.email); 
      console.log('user-----', user.user); 
      // Check if the user already exists in your database
      const existingUser = await User.findOne({ email: user.user.email });

      if (!existingUser) {
        // If the user does not exist, create a new one
        const newUser = new User({
          name: user.user.name,
          email: user.user.email,
          phone: null, // You might want to handle this field differently
          password: null, // Password might not be applicable for OAuth users
          isCredentialUser: false, // Set to false for OAuth users
        });

        await newUser.save();
        user.id = newUser._id; // Set the user ID for session
      } else {
        // If the user exists, you can update their last login time or other fields if needed
        user.id = existingUser._id; // Set the user ID for session
      }

      return true; // Return true to indicate successful sign-in
    },
    async session(session, user) {
      if(user && user._id){
        session.user.id = user._id;
      }
      // Attach user ID to the session
      return session;
    },
  },
  // Additional options can be defined here, callbacks and others
  secret: process.env.NEXTAUTH_SECRET,
};
