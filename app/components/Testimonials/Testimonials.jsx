import c from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <div className={c.cont} id="otimizando">
      <div className={c.wrapper}>
        <div className={c.leftBlock}>
          <div className={c.titleWrapper}>
          <img className={c.img} src='/Achievement.png' alt='presentation ilustration' />
          </div>
        </div>

        <div className={c.rightBlock}>
          <div className={c.title}>
          <h3>O que dizem os usuários </h3>
          </div>
          <p className={c.description}>“Desde que migramos para a quioske, conseguimos aumentar nossas vendas, qualidade do serviço e ainda economizar tempo.”</p>
          <p className={c.owner}>Jonas, Proprietário Grill House</p>
        </div>
      </div>

    </div>
  );
}
