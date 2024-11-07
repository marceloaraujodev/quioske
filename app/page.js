'use client'
import Cardapio from './components/Cardapio/Cardapio';
import Login from './components/Login/Login';
import Tables from './components/Tables/Tables';
import c from "./page.module.css";
import { OrderProvider } from './Providers/OrderContext';
import { useOrderContext } from './Providers/OrderContext';

export default function Home() {
  const { isModalOpen, setIsModalOpen } = useOrderContext();
  
  return (
    <>
    <OrderProvider>
      <Login />
      {/* <Tables /> */}
      <Cardapio 
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </OrderProvider>
    </>

  );
}
