import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from'react-hook-form';
import c from '../Login.module.css';

export default function CredentialsForm({isCredentials, setIsCredentials}) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    //// pass form data to backend API here
    // await signIn('credentials', { email, password });
    // setIsCredentials(false);
  };

  return (
    <>
      <p>Crendenciais:</p>
      <form className={c.formCont} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          placeholder="Email"
        />
         {errors.email && <p>{errors.email.message}</p>}
        <input
          {...register('password', { required: "Password is required"})}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button >
        {/* <button onClick={() => signIn('credentials', { email, password })}> */}
          Sign in
        </button>
      </form>
    </>
  );
}
