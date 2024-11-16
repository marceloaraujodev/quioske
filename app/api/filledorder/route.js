import { NextResponse } from "next/server";
import { handleError } from "@/app/utils/errorHandler";
import Order from "@/app/models/orders";

export async function PATCH(req){
  try {
    // // await axios.delete(`/api/orders/${orderId}`)
    // const { searchParams } = new URL(req.url);
    // const orderId = searchParams.get("orderId");
    // console.log('orderId from filled single order in the backend', orderId);

    const { orderId, itemId } = await req.json();

    const order = await Order.findOne({_id: orderId})

    console.log('order at filledorder:', order);

    if(!order){
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    // update fulfilled status of the specific item
    const item = order.orderDetails.find((item) => item._id.toString() === itemId);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    item.fulfilled = true;
    console.log('item should be set fulfilled to true', item);
    await order.save();

    return NextResponse.json({
      message: 'success',
      order
    });
    
  } catch (error) {
    handleError(error);
  }
}