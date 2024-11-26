import { NextResponse } from "next/server";
import Menu from "@/app/models/menus";
import { mongooseConnect } from "@/app/lib/mongooseConnect";

export  async function POST(req){
  await mongooseConnect();
  
  const data = await req.json();
  console.log('data from server category', data);

  // const menu = await Menu.create(data);
  return NextResponse.json({ message: "Menu created successfully" });
}