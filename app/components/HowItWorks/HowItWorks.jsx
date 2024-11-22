import Card from "./Card/Card";
import c from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <div className={c.cont}>
      <div className={c.title}>
        Reduza custos <br /> Aumente os pedidos!
      </div>
      <div className={c.wrapper}>
        <Card
          title="Pedidos Dinâmicos"
          description="Com menus acessíveis via QR Code, os clientes fazem pedidos direto do celular"
          btnArrowText="Saiba Mais"
          imgUrl="./how-img-1.svg"
          bgColor="rgb(181, 198, 180)"
        />
        <Card
          title="Mais Vendas, Menos Trabalho"
          description="Aumente a eficiência e reduza custos operacionais. Acabou a correria de levar e buscar menus."
          btnArrowText="Saiba Mais"
          imgUrl="./how-img-2.svg"
          bgColor="rgb(181, 198, 180)"
        />
        <Card
          title="Atendimento  Ágil"
          description="Seu cliente faz o pedido em segundos. Um atendimento moderno e prático."
          btnArrowText="Saiba Mais"
          imgUrl="./how-img-3.svg"
          bgColor="rgb(181, 198, 180)"
        />
      </div>
    </div>
  );
}
