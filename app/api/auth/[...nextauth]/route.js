import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { authOptions } from '../../../lib/auth';
import { configDotenv } from 'dotenv';
configDotenv();

// authOptions directly here - lib folder need it.
const handler = NextAuth(authOptions)


//// no need to use the authOptions from lib folder
// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ]
// })

export { handler as GET, handler as POST}

