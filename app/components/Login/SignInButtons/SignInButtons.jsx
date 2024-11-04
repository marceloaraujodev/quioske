import { signIn } from 'next-auth/react';
import c from '../Login.module.css';

export default function SignInButtons({ setIsCredentials }) {
  return (
    <>
      <p>Login:</p>
      <div className={c.btns}>
        <button
          className={c.btnCont}
          onClick={() =>
            signIn('google', { callbackUrl: 'http://localhost:3000/protected' })
          }>
          <img src="/google.svg" alt="google logo" />
          Sign in with Google
        </button>
        <button className={c.btnCont} onClick={() => setIsCredentials(true)}>
          Sign in with Email
        </button>
        {/* <button className={c.btnCont} onClick={() => signIn('credentials')}>Sign in with Email</button> */}
        {/* <button className={c.btnCont} onClick={() => signIn('facebook')}>
                  Sign in with Facebook
        </button> */}
      </div>
    </>
  );
}
