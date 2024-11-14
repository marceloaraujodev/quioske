import { NextResponse } from "next/server";
import { mongooseConnect } from "@/app/lib/mongooseConnect";

let clients = [];

export async function GET(req) {
  await mongooseConnect()
  console.log('enter route for updates')
  try {
    console.log('enter try block for order/updates')
    const { readable, writable } = new TransformStream();
    
    const writer = writable.getWriter();
    // writer.write("retry: 5000\n");
    writer.write("event: connected\ndata: {}\n\n");
    console.log('Client connected, sending initial message');
    
    // Add this client writer to the list of clients
    clients.push(writer);
    
    // Clean up client on disconnect
    req.signal.addEventListener("abort", () => {
      clients = clients.filter(client => client !== writer);
      writer.close();
      console.log('Client disconnected');
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
    
  } catch (error) {
    console.error("Error in SSE GET route:", error);
  }
}

// Broadcast function to push data to all connected clients
export function broadcastOrderUpdate(order) {
  console.log("Broadcasting order:", order); 
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(order)}\n\n`);
  });
}