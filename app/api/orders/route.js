import { NextResponse } from "next/server";
import { createError, handleError } from '../../utils/errorHandler';
import Order from "@/app/models/orders";

export async function POST(req){
  try {
    const data = await req.json()
    console.log(data);

    const order = await Order.create({
      tableNumber: 4,
      orders: data,
      totalAmount: 10
    })

    console.log(order);

    return NextResponse.json({message: 'success'});
  } catch (error) {
    return handleError(error);
  }
}