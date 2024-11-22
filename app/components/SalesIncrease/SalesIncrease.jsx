import { FaRegCheckCircle } from "react-icons/fa";
import c from './SalesIncrease.module.css';

export default function SalesIncrease() {
  return (
    <div className={c.cont}>
      <div className={c.wrapper}>
        <div className={c.leftBlock}>
          <div className={c.titleWrapper}>
          <img className={c.img} src='/presentation-5.png' alt='presentation ilustration' />
          </div>
        </div>

        <div className={c.rightBlock}>
          <div className={c.title}>
          <h3>Otimizando o seu negócio</h3>
          </div>
          <p className={c.description}>A Quioske economiza seu tempo e dinheiro para que você possa se concentrar no que realmente importa: proporcionar uma experiência excepcional aos seus clientes.</p>

          <div className={c.details}><FaRegCheckCircle size={22} />Redução de custos</div>
          <div className={c.details}><FaRegCheckCircle size={22} />Maior número de pedidos</div>
          <div className={c.details}><FaRegCheckCircle size={22} />Menus na palma da mão</div>
        </div>

      </div>

    </div>
  );
}
