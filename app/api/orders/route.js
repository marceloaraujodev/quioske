import { NextResponse } from "next/server";
import { handleError } from "@/app/utils/errorHandler";
import Order from "@/app/models/orders";
import { mongooseConnect } from "@/app/lib/mongooseConnect";

let ordersClients = [];

export async function GET(req) {
  await mongooseConnect();

  if (req.headers.get("accept") === "text/event-stream") {
    try {
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      writer.write("event: connected\ndata: {}\n\n");
      console.log('Client connected for orders SSE');

      ordersClients.push(writer);

      req.signal.addEventListener("abort", () => {
        ordersClients = ordersClients.filter(client => client !== writer);
        writer.close();
        console.log('Client disconnected from orders SSE');
      });

      return new NextResponse(readable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    } catch (error) {
      console.error("Error in SSE GET route for orders:", error);
    }
  } else {
    try {
      const orders = await Order.find();

      return NextResponse.json({
        message: 'success',
        orders,
      });
    } catch (error) {
      handleError(error);
    }
  }
}

export function broadcastOrders(orders) {
  console.log("Broadcasting orders:", orders);
  ordersClients.forEach(client => {
    client.write(`data: ${JSON.stringify(orders)}\n\n`);
  });
}
