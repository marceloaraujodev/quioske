import { NextResponse } from "next/server";

export async function POST(req){
  const { name, email, message } = await req.json();

  // create send email functionality for the message from footer

  console.log({name, email, message});

  return NextResponse.json({message: 'success'}, {status: 200});
}