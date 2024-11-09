import { NextResponse } from "next/server";
import Menu from "@/app/models/menus";

export async function POST(req){

  const data = await req.json();
  // console.log(data);
  // const updatedMenu = data.category

  // const menu = await Menu.findOneAndUpdate({user: data.user}, {category: data.category});

  // user 672e136e012211bba5defa59 will need the user in the menu document

  return NextResponse.json({message: 'success'})
}