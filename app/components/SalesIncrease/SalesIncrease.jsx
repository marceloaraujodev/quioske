import { FaRegCheckCircle } from "react-icons/fa";
import c from './SalesIncrease.module.css';

export default function SalesIncrease() {
  return (
    <div className={c.cont} id="otimizando">
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
          <p className={c.description}>A Quioske agiliza pedidos e reduz custos, conectando seus clientes diretamente ao menu por QR Code. Simplifique operações e ofereça um atendimento rápido e eficiente</p>

          <div className={c.details}><FaRegCheckCircle size={22} />Redução de custos</div>
          <div className={c.details}><FaRegCheckCircle size={22} />Maior número de pedidos</div>
          <div className={c.details}><FaRegCheckCircle size={22} />Menus na palma da mão</div>
        </div>

      </div>

    </div>
  );
}
