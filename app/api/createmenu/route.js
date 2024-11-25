import { NextResponse } from "next/server";

export async function POST(req){
  const data = await req.json();
  console.log('this is data in the create menu route', data);

  return NextResponse.json({message: 'success'})
}