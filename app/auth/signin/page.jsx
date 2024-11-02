'use client'
import { signIn } from 'next-auth/react';
import c from './signInPage.module.css';

export default function SignInPage() {
  return (
    <div className={c.cont}>
        Login:
        <button className={c.btnCont} onClick={() => signIn('google')}>
          <img src='/google.svg' alt='google logo'/>Sign in with Google
        </button>
        <button className={c.btnCont} onClick={() => signIn()}>Sign in with Email</button>
    </div>
  )
}