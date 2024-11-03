import { NextResponse } from "next/server";

export async function POST(req){
  const { name, email, phone, password } = await req.json();

  console.log({name, email, phone, password});

  return NextResponse.json({
    message: 'success'
  })
}