'use client'
import c from './Table.module.css';

// this is for the vendor view
export default function Table({id, orders, }) {
  const [tableNumber] = id;
  console.log(tableNumber)
  
  return (
    <div className={c.cont}>Table: {id}
      <div>
        Orders:
        <ul>
          <li>Order 1</li>
          <li>Order 2</li>
          <li>Order 3</li>
        </ul>
      </div>
    </div>
  )
}