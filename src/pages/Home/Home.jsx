import '../../assets/css/Home.css';

import icone from '../../assets/img/icone.svg'
import user from '../../assets/img/user-icon.svg'
import exemplo from '../../assets/img/imagem-exemplo.png'
import direita from '../../assets/img/direita.svg'
import esquerda from '../../assets/img/esquerda.svg'

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div>
            <h1>Configurando Painel</h1>
            <img src={icone} alt="icone" />
          </div>
          <img src={user} alt="icone usuário" />
        </div>
      </header>

      <main>

        <section>
          <div>
            <form action="">
              <form action="">
                <div>
                  <input type="text"
                    placeholder="Nome da Campanha:"
                  />
                  <input type="datetime-local"
                    placeholder="Data de Início:"
                  />
                  <input type="datetime-local"
                    placeholder="Data de Expiração"
                  />
                  <input type="file"
                    placeholder="Escolher Arquivo"
                  />
                </div>
              </form>
            </form>
          </div>
          <div>
            <img src={exemplo} alt="imagem exemplo" />
            <div>
              <img src={esquerda} alt="botão esquerda" />              
              <img src={direita} alt="botão direita" />              
            </div>
          </div>
        </section>

        <section></section>
      </main>
    </div>
  );
}

export default Home;
