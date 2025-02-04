import c from './Tables.module.css';

export default function Tables({empresa='test'}) {
  const tables = [
    { table: 1 },
    { table: 2 },
    { table: 3 }, 
    { table: 4 },
    // Add more tables as needed
  ]

  return (
    <div className={c.container}>
      <h1 className={c.header}>{empresa} Tables</h1>
      
      <div className={c.tablesGrid}>
        {tables.map((table, index) => (
          <a href={`/vendor/table/${table.table}`} key={index} className={c.tableLink}>
            <div className={c.tableCard}>
              <div className={c.statusIndicator} data-status="available" />
              <div className={c.tableNumber}>Table {table.table}</div>
              <img 
                className={c.tableIcon} 
                src="/table.png"
                  alt="Dining Table"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}