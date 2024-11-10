import { NextResponse } from "next/server";
import { handleError } from "@/app/utils/errorHandler";
import Order from "@/app/models/orders";

export async function PATCH(req){
  try {
    const order = await req.json();
    console.log('order to update', order);

    console.log(order.orderDetails, order.orderId);

    await Order.findOneAndUpdate({_id: order.orderId}, {orderDetails: order.orderDetails});

    // console.log(orders);

    return NextResponse.json({
      message: 'success',
    });
    
  } catch (error) {
    handleError(error);
  }
}