import bcrypt from 'bcrypt';

export default async function hashPassword(password) {
  const saltRounds = 10; 
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash; // Return the hashed password
  } catch (error) {
    // Handle the error as needed, for example:
    throw new Error('Error hashing password');
  }
}