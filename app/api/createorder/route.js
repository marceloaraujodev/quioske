import { NextResponse } from "next/server";
import { handleError } from '../../utils/errorHandler';
import Order from "@/app/models/orders";
import { mongooseConnect } from "@/app/lib/mongooseConnect";

// when user orders a product
export async function POST(req){
  mongooseConnect();

  try {
    const data = await req.json()
    // console.log(data);
    const orderData = {...data, orderDetails: data.orders}
    const order = await Order.create(orderData)


    // console.log('This is the order confirmation saved on db', order);

    return NextResponse.json({message: 'success', order});
  } catch (error) {
    return handleError(error);
  }
}