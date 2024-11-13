import { NextResponse } from "next/server";
import { handleError } from '../../utils/errorHandler';
import Order from "@/app/models/orders";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import {broadcastOrderUpdate} from '../orders/updates/route';

// when user orders a product
export async function POST(req){
  mongooseConnect();

  try {
    const data = await req.json()
    console.log('data from create order recieved from cardapio', data);
    const orderData = {...data, orderDetails: data.orders}
    const order = await Order.create(orderData)

    // This will broadcast the order to all
    // console.log('order before broadcast call',order);
    broadcastOrderUpdate(order);

    // console.log('This is the order confirmation saved on db', order);

    return NextResponse.json({message: 'success', order});
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}