import Link from 'next/link';
import c from './MenuBtn.module.css';


export default function MenuBtn() {
  return (
    <div className={c.linkCont}>
    <Link className={`btnLink`} href="/vendor">
      Menu
    </Link>
  </div>
  )
}