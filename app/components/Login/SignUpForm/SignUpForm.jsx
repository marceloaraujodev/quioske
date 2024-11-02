import { useState } from 'react';
import axios from 'axios';
import c from '../Login.module.css';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(''); // pass this to db its informatted
  const [formattedPhone, setFormattedPhone] = useState('');

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setPhone(inputValue); // Store the raw number
    setFormattedPhone(formatPhoneNumber(inputValue)); // Format for display
  };

  function formatPhoneNumber(number) {
    console.log(number);
    let formattedNumber = '';
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

  async function handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
      name,
      email,
      password,
      phone,
    }
    
    console.log(formData);
    try {
      const res = await axios.post('/api/signup', formData)
    } catch (error) {
      
    }
    
  }

  return (
    <>
      <p>Sign Up</p>
      <form className={c.formCont} onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={formattedPhone}
          onChange={(e) => handlePhoneChange(e)}
          maxLength={15}
          required
        />
        <button type="submit">
          {/* <button onClick={() => signIn('credentials', { email, password })}> */}
          Sign in
        </button>
      </form>
    </>
  );
}
