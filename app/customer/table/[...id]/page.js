
import Cardapio from "@/app/components/Cardapio/Cardapio";
import c from './tablePage.module.css';

export default async function Menu({params}) {
  const {id} = await params;
  const [ tableNumber, quioskeName, _id] = id[0].split("_");

  // console.log(id);
  // console.log(quioskeName, tableNumber, _id);

  return (
    <div className={c.cont}>
      <div className={c.MenuBusinessName}>
        {quioskeName}
      </div>
      <Cardapio quioskeName={quioskeName} tableNumber={tableNumber} _id={_id}/>
    </div>
  )
}