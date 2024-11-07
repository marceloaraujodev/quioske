'use client';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for Next.js App Router
import { useEffect, useState } from 'react';
import SignInForm from './SignInForm/SignInForm';
import SignInButtons from './SignInButtons/SignInButtons';
import SignUpForm from './SignUpForm/SignUpForm';
import c from './Login.module.css';

export default function Login() {
  const [isCredentials, setIsCredentials] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);


  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check for the error query param in the URL
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get('error'); // Get the value of 'error' if exists

    if (error === 'AccessDenied') {
      setIsLogIn(false); // Force the SignUpForm to be shown if there's an AccessDenied error
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/vendor/protected');
    }
   
  }, [status, router]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className={c.cont}>
      <img className={c.logo} src="/quiosque-white.png" alt="logo" />
      <div className={c.loginCont}>
        {isLogIn ? (
          <>
            {isCredentials ? (
              <SignInForm />
            ) : (
              <SignInButtons setIsCredentials={setIsCredentials} />
            )}
            <p className={c.text}>
              Don't have an account? Sign up{' '}
              <a href="/#" onClick={() => setIsLogIn(false)}>
                here
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <SignUpForm />
            <p className={c.text}>
              Already have an account? Log in{' '}
              <a
                href="/#"
                onClick={() => {
                  setIsCredentials(false);
                  setIsLogIn(true);
                }}>
                here
              </a>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
}
