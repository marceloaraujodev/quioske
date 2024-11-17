import { NextResponse } from 'next/server';
import { handleError, createError } from '@/app/utils/errorHandler';
import Order from '@/app/models/orders';

export async function PATCH(req) {
  try {
    const { orderId, itemId } = await req.json();
    
    const order = await Order.findOne({_id: orderId})
    console.log(order);

    if(!order){
      return createError(404, "Order not found");
    }

    // 2+ items order
    if (order.orderDetails.length > 1) {
      console.log('2+ items order');
      
      
      // update fulfilled status of the specific item
      console.log('this should be itemId', itemId);
      const item = order.orderDetails.find((item) => item._id.toString() === itemId);
      console.log('this should be item', item);
      if (!item) {
        return createError(404, 'No item found for order.')
      }
      item.fulfilled = true;
      console.log('item should be set fulfilled to true', item);
      await order.save();
      
      return NextResponse.json({
        message: 'success',
        order
      });
    }
    
    // 1 item order
    if(order.orderDetails.length === 1){
      console.log('1 items order');
  
      // Sets fulfilled status of single item order
      order.orderDetails[0].fulfilled = true;
      await order.save();
  
      return NextResponse.json({
        message: 'success',
        order
      });
    }

    return createError(400, 'Invalid Order State')

  } catch (error) {
    return handleError(error);
  }
}
