import { useState } from "react";
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

      console.log(res.data);
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
    console.log(number);
    let formattedNumber = "";
    if (number > 0) {
      const areaCode = `(${number.slice(0, 2)})`;
      formattedNumber += areaCode;
      if (number > 2) {
        const fiveDigs = `${number.slice(2, 6)}`;
        formattedNumber += ` ${fiveDigs}`;
        if (number > 6) {
          const fourDigs = `${number.slice(6, 11)}`;
          console.log(`${areaCode} ${fiveDigs} ${fourDigs}`);
          formattedNumber += ` ${fourDigs}`;
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
          {...register("name", { required: true })} 
          type="text" 
          placeholder="Nome" 
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input 
          {...register("email", { required: "Email is required" })} 
          type="email" 
          placeholder="Email" 
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input 
          {...register("password", { required: "Password is required" })} 
          type="password" 
          placeholder="Password" 
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input 
          type="tel" 
          placeholder="Telefone" 
          value={formattedPhone} 
          onChange={handlePhoneChange} 
          maxLength={15} 
        />
        {errors.phone && <p>{errors.phone.message}</p>}

        {/* Hidden input to store the raw phone number */}
        <input 
          {...register("phone", { required: "Phone is required" })} type="hidden" 
        />

        <button type="submit">
          {/* <button onClick={() => signIn('credentials', { email, password })}> */}
          Sign Up
        </button>
      </form>
    </>
  );
}
