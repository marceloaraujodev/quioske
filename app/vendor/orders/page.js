'use client';
import OrdersPage from '@/app/components/OrdersPage/OrdersPage';
import Footer from '@/app/vendor/Footer/Footer';
import c from './ordersRoutePage.module.css'

export default function OrdersRoutePage() {
  return (
    <>
      <div className={c.content}>
      <OrdersPage />
      <Footer />
      </div>
    </>
  );
}
