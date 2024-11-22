import c from './FAQ.module.css';

export default function FAQ() {
  return (
    <div className={c.cont} id='faq'>
      <div className={c.wrapper}>
        <div className={c.leftBlock}>
          <div className={c.titleWrapper}>
          <p className={c.title}>Perguntas <br />Frequentes</p>
          <p className={c.description}>Got questions? We have got answers! Learn more about getting started with</p>
          </div>
        </div>

        <div className={c.rightBlock}>
          <div className={c.box}>
            <details>
              <summary >Como funciona os pedidos?</summary>
              <p>O cliente scaneia o qr code, escolhe o que quer consumir e efetua o pedido. No mesmo instante o pedido é enviado para a aba de Pedidos, onde depois de despachar o pedido você o marca como despachado. O garçõm leva o pedido até o cliente e coleta o pagamento.</p>
            </details>

            <details>
              <summary>Como o quioske pode me ajudar?</summary>
              <p>O quioske reduz o tempo de atendimento, deixando o cliente mais a vontade para pedir o que quer na hora que quer. Elimina o tempo que o garçõm teria que levar o menu até o cliente e retirar o pedido. Assim dando agilidade no atendimento, reduzindo o custo com empregados e aumentando o numero de pedidos que o seu estabelecimento consegue atender.</p>
            </details>

            <details>
              <summary>Como faço o upload do meu menu?</summary>
              <p>No momento você pode nos enviar o seu menu e nós fazemos o cadastro. Em breve você tera a opção de cadastrar o seu menu.</p>
            </details>
            <details>
              <summary>Como o pagamento é feito?</summary>
              <p>O pagamento é cobrado pelo estabelecimento, em breve teremos a posibilidade de aceitar pagamentos direto do site com taxas competitivas.</p>
            </details>
            <details>
              <summary>Quantos menus posso ter?</summary>
              <p>Vai depender do plano que você escolher</p>
            </details>
          </div>
        </div>

      </div>

    </div>
  );
}
