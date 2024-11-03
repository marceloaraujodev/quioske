import { NextResponse } from "next/server";
import User from '../../models/users';
import { createError, handleError } from '../../utils/errorHandler';
import validatePassword from "@/app/utils/passwordValidator";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import hashPassword from "@/app/utils/hashPassword";


export async function POST(req){
  await mongooseConnect();

  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password || !phone) {
      throw createError(400, 'Missing required fields');
    }

    // trim white spaces if any
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{1,15}$/;

    // // Validate data formats
    if(!emailRegex.test(cleanEmail)){
      throw createError(400, 'Invalid email format')
    }
    if(!phoneRegex.test(cleanPhone)){
      throw createError(400, 'Invalid phone number format')
    }
    // validatePassword returns true or false
    if(!validatePassword(cleanPassword)){
      throw createError(400, 'Please use at least one upppercase, one lowercase and at least 2 digits.')
    }

    // hash password
    const hashedPassword = await hashPassword(cleanPassword);
    console.log(hashedPassword);
  
    // creates user object
    const newUser = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: hashedPassword,
    }

    // creates user in db
    const user = new User(newUser);
    await user.save();

    return NextResponse.json({
      message: 'success',
      user: {
        name, 
        email,
        _id: user._id
      }
    })
    
  } catch (error) {
    // handle error only takes one parameter
    return handleError(error)
  }
}