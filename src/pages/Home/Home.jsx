import '../../assets/css/Home.css';

import icone from '../../assets/img/icone.svg'
import user from '../../assets/img/user-icon.svg'
import exemplo from '../../assets/img/imagem-exemplo.png'
import direita from '../../assets/img/direita.svg'
import esquerda from '../../assets/img/esquerda.svg'
import cadastrar from '../../assets/img/cadastrar.svg'
import editar from '../../assets/img/editar.svg'
import excluir from '../../assets/img/remover.svg'

function Home() {
  return (
    <div className="App">
      <header>
        <div className="container container_header">
          <div className="box_header">
            <h1>Configurando Painel</h1>
            <img className="icon_header" src={icone} alt="icone" />
          </div>
          <img className="icon_header" src={user} alt="icone usuário" />
        </div>
      </header>

      <main>

        <section>
          <div className="container_section">
            <div className="box_cadastrar">
              <h2>Cadastrar</h2>
              <form action="">
                <form action="">
                  <div className="box_form">
                    <input type="text"
                      placeholder="Nome da Campanha:"
                    />
                    <input type="date"
                      placeholder="Data de Início:"
                    />
                    <input type="date"
                      placeholder="Data de Expiração"
                    />
                    <input type="file" />

                    <img className="cadastrar_campanha" src={cadastrar} alt="botão cadastrar" />
                  </div>
                </form>
              </form>
            </div>
            <div className="box_preview">
              <img src={exemplo} alt="imagem exemplo" />
              <div>
                <img src={esquerda} alt="botão esquerda" />
                <img src={direita} alt="botão direita" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div>
            <h2>Registros</h2>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Nome da Campanha</th>
                    <th>Usuário</th>
                    <th>Data de Publicação</th>
                    <th>Data de Expiração</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <div>
                        <button><img src={editar} alt="" /></button>
                        <button><img src={excluir} alt="" /></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
