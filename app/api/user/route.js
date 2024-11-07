import { NextResponse, NextRequest } from "next/server";
import User from "@/app/models/users";

export async function GET(req){
  const email = req.nextUrl.searchParams.get('email');
  console.log(email);
  
  const user = await User.findOne({ email });
  console.log(user);
  return NextResponse.json({message: 'success', user})
}