import { NextResponse } from "next/server";
import { handleError } from '../../utils/errorHandler';
import Order from "@/app/models/orders";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import { broadcastOrderUpdate } from '../orders/updates/route';

export async function POST(req) {
  await mongooseConnect();

  try {
    const data = await req.json();
    console.log('Data from create order received:', data);
    
    const orderData = { ...data, orderDetails: data.orders };
    const order = await Order.create(orderData);
    console.log('Order created:', order);

    // Broadcast new order to all clients
    broadcastOrderUpdate(order);
    console.log('Order broadcasted to clients');

    return NextResponse.json({ message: 'success', order });
  } catch (error) {
    console.error('Error creating order:', error);
    return handleError(error);
  }
}
