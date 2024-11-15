import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function handleAuth(req){
  const token = await getToken({
    req, 
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log('token from middleware:------',token);

  // if(!token){
  //   const loginUrl = new URL('/', req.url); // redirects to home page
  //   return NextResponse.redirect(loginUrl);
  // }

  if(token){
    return NextResponse.next()
  }

  return NextResponse.next(); // if I have multiple middlewares I need to return null here so it will pass to the next middleware
}
