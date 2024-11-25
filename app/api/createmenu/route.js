import { NextResponse } from "next/server";
import Menu from "@/app/models/menus";
import { mongooseConnect } from "@/app/lib/mongooseConnect";

export async function POST(req){
  await mongooseConnect();

  const {menu, session} = await req.json();
  // console.log('this is data in the create menu route', data);

  const empresa = session.user.empresa;
  const userId = session.user._id;

  console.log('this is the menu:', menu)


  const newMenu = {
    quioskeName: empresa,
    user: userId,
    menuName: menu[0].menuName,
    // category: [{name: menu.category, subCategory: menu.subCategory}],
    category: menu.map((cat) => ({
      name: cat.category,
      subCategory: cat.subCategory.map((subCat) => ({
        name: subCat.name,
        items: subCat.items.map((item) => ({
          name: item.name,
          price: item.price,
          ml: item.tamanho || null, // Optional
          img: item.img || null, // Optional
          description: item.description || null, // Optional
        })),
      })),
    })),
  }

  console.log(newMenu);
  console.log('this should be subcategory', newMenu.category[0].subCategory.forEach(subCatItem => console.log(subCatItem)))

  // // Construct menu object according to schema
  // const newMenu = {
  //   user: userId,
  //   quioskeName: empresa,
  //   menuName: menu.menuName,
  //   category: menu.category.map((cat) => ({
  //     name: cat.category, // Assuming cat has a "category" field
  //     subCategory: cat.subCategory.map((subCat) => ({
  //       name: subCat.name,
  //       items: subCat.items.map((item) => ({
  //         name: item.name,
  //         price: item.price,
  //         ml: item.tamanho || null, // Optional fields default to null
  //         img: item.img || null,
  //         description: item.description || null,
  //       })),
  //     })),
  //   })),
  // };

  console.log('---> new menu:',newMenu)
  await Menu.create(newMenu)

  return NextResponse.json({message: 'success'})
}