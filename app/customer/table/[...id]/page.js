
import Cardapio from "@/app/components/Cardapio/Cardapio";

export default async function Menu({params}) {
  const {id} = await params;
  const [quioskeName, tableNumber] = id[0].split("_");
  console.log(id);
  console.log(quioskeName, tableNumber);

  return (
    <div>Menu {quioskeName}
      <Cardapio quioskeName={quioskeName} tableNumber={tableNumber} />
    </div>
  )
}