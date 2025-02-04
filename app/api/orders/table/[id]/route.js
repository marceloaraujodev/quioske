import { NextResponse } from "next/server";
import Order from "@/app/models/orders";
import { mongooseConnect } from "@/app/lib/mongooseConnect";

export async function GET(req, { params}){
  await mongooseConnect();
  // const data = await req.json();
  const {id} = await params
  console.log(id);

  const order = await Order.find({tableNumber: id})


  // Check if the user is authenticated
  // const isAuthenticated = await checkAuthentication();

  return NextResponse.json(order || {}, { status: 200 });
}