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

    // console.log(await generateQRCode('http://localhost:3000/customer/table/2')) // only for qrcode generation

    const order = await Order.create(data)

    console.log('This is the order confirmation saved on db', order);

    return NextResponse.json({message: 'success'});
  } catch (error) {
    return handleError(error);
  }
}