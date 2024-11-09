// app/layout.js
import localFont from 'next/font/local';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';
import SessionProviderWrapper from './Providers/SessionProvider';
import { OrderProvider } from './Providers/OrderContext';
import { Inter } from 'next/font/google'
import { Roboto } from 'next/font/google'
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  // if(session){
  //   Signed in as {session.user.email} <br />
  //   <button onClick={() => signOut()}>Sign out</button>
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper session={session}>
          <OrderProvider>
            {/* Nav can go here */}
            {children}
            {/* Footer here */}
          </OrderProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
