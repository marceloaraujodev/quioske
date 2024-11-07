import { useState } from "react";
import { useSession, signIn } from 'next-auth/react';
import axios from "axios";
import { useForm } from "react-hook-form";
import c from "../Login.module.css";

export default function SignUpForm() {
  const [formattedPhone, setFormattedPhone] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // function provided by react-hook-form, it receives form data as an object
  const onSubmit = async (formData) => {
    console.log('onSubmitForm:', formData);

    try {
      const res = await axios.post("/api/signup", formData);

      console.log('response after successful signUp', res.data);
      if(res.data.message === "success") {
        await signIn('credentials', {
          redirect: true, 
          email: formData.email,
          password: formData.password,
          callbackUrl: '/vendor/protected' // redirects to desired protected page.
        })
      }
      // Redirect to login page or display success message
    } catch (error) {
      console.error("Error during signup", error);
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setFormattedPhone(formatPhoneNumber(inputValue)); // Format for display
    // setPhone(inputValue); // Store the raw number old one
    setValue("phone", inputValue); // Update hidden field with raw number
  };

  function formatPhoneNumber(number) {
    // console.log(number);
    let formattedNumber = "";
  
    if (number.length > 0) {
      // Format the area code (first two digits)
      const areaCode = `${number.slice(0, 2)}`;
      formattedNumber += areaCode;
      
      if (number.length > 2) {
        // Check if we need a "4-4" or "5-4" format
        if (number.length <= 10) { // "4-4" format like (47) 2000-2999
          const firstPart = `${number.slice(2, 6)}`; // First 4 digits after area code
          const secondPart = `${number.slice(6, 10)}`; // Remaining 4 digits
          formattedNumber += ` ${firstPart} ${secondPart}`;
        } else { // "5-4" format like (47) 99200 9823
          const firstPart = `${number.slice(2, 7)}`; // First 5 digits after area code
          const secondPart = `${number.slice(7, 11)}`; // Remaining 4 digits
          formattedNumber += ` ${firstPart} ${secondPart}`;
        }
      }
    }
  
    return formattedNumber.trim();
  }

  return (
    <>
      <p>Sign Up</p>
      <form className={c.formCont} onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register("name", { required: "Favor preencher campo Nome" })} 
          type="text" 
          placeholder="Nome" 
          required
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input 
          {...register("empresa", { required: "Favor preencher campo Empresa" })} 
          type="text" 
          placeholder="Empresa" 
          required
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input 
          {...register("email", { required: "Favor preencher campo Email" })} 
          required
          type="email" 
          placeholder="Email" 
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input 
          {...register("password", { required: "Favor preencher campo Password" })} 
          required
          type="password" 
          placeholder="Password" 
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input 
          type="tel" 
          required
          placeholder="Telefone" 
          value={formattedPhone} 
          onChange={handlePhoneChange} 
          maxLength={15} 
        />
        {errors.phone && <p>{errors.phone.message}</p>}

        {/* Hidden input to store the raw phone number */}
        <input 
          {...register("phone", { required: "Favor preencher campo Phone" })} type="hidden" 
        />

        <button type="submit">
          {/* <button onClick={() => signIn('credentials', { email, password })}> */}
          Sign Up
        </button>
      </form>
    </>
  );
}
