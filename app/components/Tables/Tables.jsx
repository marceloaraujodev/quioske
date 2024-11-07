import c from './Tables.module.css';

export default function Tables({empresa}) {
  const tables = [
    {  table: 1,  },
    {  table: 2,  },
    {  table: 3,   }, 
    {  table: 4,   }, 
  ]

  return (
    <>
    <div className={c.cont}>Tables: {empresa}

      <div className={c.tablesCont}>
        {tables.map((table, index) => {
          return (
            <a href={`/table/${table.table}`} key={index}>
            <div key={index} className={c.table}>
              <div className={c.tableImgCont}>Table {table.table}
                <img className={c.tableImg} src='/table-bw.png' alt='table' />
              </div>
            </div>
            </a>
          )
        })}
      </div>
    </div>
    </>
  )
}