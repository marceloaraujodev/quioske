import { useState } from 'react';
import { signIn } from 'next-auth/react';
import c from '../Login.module.css';

export default function CredentialsForm({isCredentials, setIsCredentials}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <p>Crendenciais:</p>
      <div className={c.formCont}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => console.log('click')}>
        {/* <button onClick={() => signIn('credentials', { email, password })}> */}
          Sign in
        </button>
      </div>
    </>
  );
}
