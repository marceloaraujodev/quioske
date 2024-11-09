import c from './orders.module.css';

export default function OrdersPage() {
  const orders = [
    { order: 'brahma lata' },
    { order: 'caipirinha limao' },
    { order: 'skol garrafa' },
    { order: 'heineken garrafa' },
    { order: 'caipirinha limao' },
    { order: 'skol garrafa' },
    { order: 'heineken garrafa' },
  ];
  const filledOrders = [
    { order: 'brahma lata' },
    { order: 'caipirinha limao' },
    { order: 'skol garrafa' },
    { order: 'heineken garrafa' },
  ];

  return (
    <>
      <div className={c.cont}>
        <h1>Pedidos</h1>
        <div className={c.wrapper}>
          <div className={c.unfilled}>
            {orders.map((order, index) => {
              return (
                <div key={index} className={c.order}>
                  <div className={c.orderBlock}>
                    <div className={c.item}>
                      <div className={c.item}>{order.order}</div>
                    </div>
                    <div className={c.item}>
                      <button className={c.btn}>Pronta</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
     
      <h2>Completas</h2>
        <div className={c.wrapper}>
          <div className={c.filled}>
            {orders.map((order, index) => {
              return (
                <div key={index} className={`${c.order} ${c.finished}`}>
                  <div className={c.orderBlock}>
                    <div className={c.item}>
                      <div className={c.item}>{order.order}</div>
                    </div>
                    <div className={c.item}>
                      <button className={`${c.btn} ${c.btnFinished}`}>Pronta</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </>
  );
}
