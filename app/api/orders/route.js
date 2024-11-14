import { NextResponse } from "next/server";
import Order from "@/app/models/orders";
import { mongooseConnect } from "@/app/lib/mongooseConnect";


// SSE response headers
const sseHeaders = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
};
// SSE route for real-time order updates
export async function GET(req) {
  await mongooseConnect();

  // Create a response stream for SSE
  const readableStream = new ReadableStream({
    async start(controller) {
      const changeStream = Order.watch();
      let isClosed = false;  // Flag to track if the stream has been closed

      const closeStream = () => {
        if (!isClosed) {
          isClosed = true; // changes isClosed to true
          controller.close();  // Ensure the stream is closed only once
        }
      };

      // Handle change events from the MongoDB change stream
      changeStream.on("change", (change) => {
        if (!isClosed) {  // Check if the stream is closed before enqueuing data
          try {
            // Enqueue the order change data to stream
            controller.enqueue(`data: ${JSON.stringify({ order: change.fullDocument })}\n\n`);
          } catch (error) {
            console.error("Error processing change event:", error);
            controller.error(error);  // Propagate error to the stream
          }
        }
      });

      // Gracefully close the stream on client disconnect or error
      req.signal.addEventListener("abort", async () => {
        console.log("Client disconnected, closing change stream...");
        changeStream.close();  // Close change stream on client disconnect
        closeStream();  // Close the SSE stream
      });

      // Handle errors in the change stream
      changeStream.on("error", (error) => {
        console.error("Error in change stream:", error);
        if (!isClosed) {
          controller.error(error);  // Propagate error to the stream
        }
      });

      // Handle the change stream close event
      changeStream.on("close", () => {
        console.log("Change stream closed");
        closeStream();  // Close the SSE stream when the change stream is closed
      });

      // Cleanup on server shutdown
      process.on("SIGINT", () => {
        console.log("Server shutting down...");
        changeStream.close();  // Close the change stream
        closeStream();  // Close the SSE stream
        process.exit();  // Exit the process
      });
    },
  });

  return new NextResponse(readableStream, { headers: sseHeaders });
}