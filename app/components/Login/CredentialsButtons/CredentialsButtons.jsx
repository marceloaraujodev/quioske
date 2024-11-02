import { signIn } from 'next-auth/react';
import c from '../Login.module.css';

export default function CredentialsButtons({setIsCredentials}) {
  return (
    <>
    <p>Login:</p>
            <div className={c.btns}>
              <button className={c.btnCont} onClick={() => signIn('google')}>
                <img src="/google.svg" alt="google logo" />
                Sign in with Google
              </button>
              <button
                className={c.btnCont}
                onClick={() => setIsCredentials(true)}>
                Sign in with Email
              </button>
              {/* <button className={c.btnCont} onClick={() => signIn('credentials')}>Sign in with Email</button> */}
              {/* <button className={c.btnCont} onClick={() => signIn('facebook')}>
                  Sign in with Facebook
                </button> */}
            </div>
    </>
  )
}