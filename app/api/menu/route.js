import { NextResponse } from 'next/server';
import User from '@/app/models/users';
import Menu from '@/app/models/menus';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import mongoose from 'mongoose';

export async function GET(req) {
  await mongooseConnect();
  console.log('im here');
  try {
    const { searchParams } = new URL(req.url);
   
    const _id = searchParams.get('_id');
    const tableNumber = searchParams.get('tableNumber');
    const quioskeName = searchParams.get('quioskeName');

    // console.log('_id, tableNumber, quioskename,--------:', _id, tableNumber, quioskeName);
      // Check if the _id is a valid ObjectId string (24 characters, hex)
      if (!mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json({ message: 'error', error: 'Invalid ObjectId format' });
    }
  
      // Convert _id to ObjectId before using it in the query
      const objectId = new mongoose.Types.ObjectId(_id);
    
    const menu = await Menu.findOne({user: objectId});
    // console.log('this is menu------------', menu);

    return NextResponse.json({ message: 'success', menu });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error', error });
  }
}
