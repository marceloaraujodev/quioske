import { NextResponse } from 'next/server';
import User from '@/app/models/users';
import Menu from '@/app/models/menus';
import { mongooseConnect } from '@/app/lib/mongooseConnect';

export async function GET(req) {
  await mongooseConnect();
  try {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('_id');
    const tableNumber = searchParams.get('tableNumber');
    const quioskeName = searchParams.get('quioskeName');

    console.log(_id, tableNumber, quioskeName);

    
    const menu = await Menu.findOne({user:_id});
    console.log('this is menu------------', menu);

    return NextResponse.json({ message: 'success', menu });
  } catch (error) {
    console.log(error);
  }
}
