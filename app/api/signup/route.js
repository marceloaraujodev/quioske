import { NextResponse } from 'next/server';
import User from '../../models/users';
import Menu from '../../models/menus';
import { createError, handleError } from '../../utils/errorHandler';
import validatePassword from '@/app/utils/passwordValidator';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import { hashPassword } from '@/app/utils/hashAndCheckPassword';

export async function POST(req) {
  await mongooseConnect();

  try {
    const { formData, menuData } = await req.json();

    const { name, email, phone, password, empresa } = formData;

    console.log('This is menuDAta', menuData);

    if ((!name || !email || !password || !phone, !empresa)) {
      throw createError(400, 'Missing required fields');
    }

    // trim white spaces if any
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();
    const cleanEmpresa = empresa.trim().replace(' ', '');

    console.log(cleanEmpresa);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{1,15}$/;

    // // Validate data formats
    if (!emailRegex.test(cleanEmail)) {
      throw createError(400, 'Invalid email format');
    }
    if (!phoneRegex.test(cleanPhone)) {
      throw createError(400, 'Invalid phone number format');
    }
    // validatePassword returns true or false
    if (!validatePassword(cleanPassword)) {
      throw createError(
        400,
        'Please use at least one upppercase, one lowercase and at least 2 digits.'
      );
    }

    // hash password
    const hashedPassword = await hashPassword(cleanPassword);
    console.log(hashedPassword);

    // creates user object
    const newUser = {
      name: cleanName,
      empresa: cleanEmpresa,
      email: cleanEmail,
      phone: cleanPhone,
      password: hashedPassword,
      isCredentialUser: true,
    };

    console.log(newUser);
    // creates user in db
    const user = new User(newUser);
    await user.save();

    // create menu if menuData exists
    if (menuData) {
      const menu = new Menu({
        category: menuData.category,
        quioskeName: cleanEmpresa,
        user: user._id
      });
      await menu.save();

      await user.save();
    }

    return NextResponse.json({
      message: 'success',
      user: {
        name,
        email,
        _id: user._id
      }
    });
  } catch (error) {
    // handle error only takes one parameter
    return handleError(error);
  }
}
