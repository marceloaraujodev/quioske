import { NextResponse } from "next/server";
import { handleError } from '../../utils/errorHandler';
import Order from "@/app/models/orders";
import { mongooseConnect } from "@/app/lib/mongooseConnect";

export async function POST(req) {
  await mongooseConnect();

  try {
    const data = await req.json();
    console.log('Data from create order received:', data);
    
    const orderData = { ...data, orderDetails: data.orders };
    const order = await Order.create(orderData);
    // console.log('Order created:', order);

    return NextResponse.json({ message: 'success', order });
  } catch (error) {
    console.error('Error creating order:', error);
    return handleError(error);
  }
}
