import "./styles.css";

export const CozinhaMain = () => {
  return (
    <>
      <main className="mainKitchen">
        <div className="KitchenText">
          <h2>PADRÃO DE QUALIDADE</h2>
          <p>
            TODOS OS PEDIDOS SÃO PREPARADOS SEGUNDO OS MAIS ALTOS PADRÕES DE QUALIDADE DO MERCADO.
            NOSSA COZINHA ESTÁ EQUIPADA COM TECNOLOGIA MODERNA E NOSSA EQUIPE É COMPOSTA POR
            PROFISSIONAIS QUALIFICADOS, ASSEGURANDO SEGURANÇA E EXCELÊNCIA EM CADA ETAPA DO PREPARO
            DOS NOSSOS HAMBÚRGUERES."
          </p>
          <ul>
            <li>Ingredientes selecionados</li>
            <li>Embalagens modernas</li>
            <li>Normas de higiene e segurança</li>
            <li>Profissionais certificados</li>
          </ul>
        </div>
        <div className="videoContainer">
          <video muted autoplay controls src="/videos/cozinha-bancada.mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </main>
      <div className="yellowDiv"></div>
    </>
  );
};
