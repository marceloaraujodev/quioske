import { NextResponse } from "next/server";
import Menu from "@/app/models/menus";

export async function POST(req){

  const data = await req.json();
  // console.log(data);
  
  const updatedMenu = data.menuData.category
  const id = data.userId;
  console.log(id);
  console.log('this is updatedMenu:', updatedMenu);

  const menu = await Menu.findOneAndUpdate({user: id}, {category: updatedMenu});

  // user 672e136e012211bba5defa59 will need the user in the menu document

  return NextResponse.json({message: 'success'})
}