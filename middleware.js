import { NextResponse } from "next/server";
import { handleAuth } from "./app/utils/auth";

// import { checkRole } from "./app/utils/checkRole";
// import { logRequest } from "./app/utils/logRequest";

export async function middleware(req){
  const middlewares = [handleAuth]

  for (const fn of middlewares) {
    const res = await fn(req); // execute each middleware
    if(res) return res; // stops and returns if the middleware responds
  }
  return NextResponse.next(); 
}

export const config = {
  matcher: ["/vendor/:path*"], // Specify which routes the middleware applies to, to add another path just add another string with the path
};