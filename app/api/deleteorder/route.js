import { NextResponse } from "next/server";
import { handleError } from "@/app/utils/errorHandler";
import Order from "@/app/models/orders";

export async function DELETE(req){
  try {
    // await axios.delete(`/api/orders/${orderId}`)
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    console.log(orderId);

    await Order.findOneAndDelete({_id: orderId})

    // console.log(orders);

    return NextResponse.json({
      message: 'success',
    });
    
  } catch (error) {
    handleError(error);
  }
}