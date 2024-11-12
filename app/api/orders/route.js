import { NextResponse } from "next/server";
import { handleError } from "@/app/utils/errorHandler";
import Order from "@/app/models/orders";
import { mongooseConnect } from "@/app/lib/mongooseConnect";

export async function GET(req){
  await mongooseConnect();
  try {

    const orders = await Order.find()

    // console.log(orders);

    return NextResponse.json({
      message: 'success',
      orders
    });
    
  } catch (error) {
    handleError(error);
  }
}