import { NextResponse } from "next/server";
import { handleError } from '../../utils/errorHandler';
import Order from "@/app/models/orders";
import generateQRCode from "@/app/utils/generateQRCode";
import { mongooseConnect } from "@/app/lib/mongooseConnect";

export async function POST(req){
  mongooseConnect();

  try {
    const data = await req.json()
    console.log(data);

    const order = await Order.create(data)

    console.log('This is the order confirmation saved on db', order);

    return NextResponse.json({message: 'success', order});
  } catch (error) {
    return handleError(error);
  }
}