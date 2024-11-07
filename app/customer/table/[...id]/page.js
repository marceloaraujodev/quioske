'use client'
import Cardapio from "@/app/components/Cardapio/Cardapio";

export default async function Menu({params}) {
  const {id} = await params;
  const [quioskeName, tableNumber, _id] = id[0].split("_");

  console.log(id);
  console.log(quioskeName, tableNumber, _id);

  return (
    <div>Menu {quioskeName}
      <Cardapio quioskeName={quioskeName} tableNumber={tableNumber} _id={_id}/>
      here
    </div>
  )
}