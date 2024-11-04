import c from './Table.module.css';

export default function Table({id, orders}) {
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