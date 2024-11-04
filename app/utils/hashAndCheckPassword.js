import bcrypt from 'bcrypt';
import { handleError } from './errorHandler';

async function hashPassword(password) {
  const saltRounds = 10; 
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash; // Return the hashed password
  } catch (error) {
    // Handle the error as needed, for example:
    throw handleError('Error hashing password');
  }
}

async function checkPassword(credentialsPassword, hashedPassword) {
  //... fetch user from a db etc.
  const match = await bcrypt.compare(credentialsPassword, hashedPassword);

  if(match) {
      //login
      return true;
  }else{
    //wrong password
    return false;
  }
}

export { checkPassword, hashPassword}