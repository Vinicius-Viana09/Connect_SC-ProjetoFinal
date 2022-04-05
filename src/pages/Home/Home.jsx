import '../../assets/css/Home.css';
import axios from 'axios';

import icone from '../../assets/img/icone.svg'
import user from '../../assets/img/user-icon.svg'
import exemplo from '../../assets/img/imagem-exemplo.png'
import direita from '../../assets/img/direita.svg'
import esquerda from '../../assets/img/esquerda.svg'
import cadastrar from '../../assets/img/cadastrar.svg'
import editar from '../../assets/img/editar.svg'
import excluir from '../../assets/img/remover.svg'
import cadastrar_resp from '../../assets/img/btn cadastrar resp.svg'
import { Component } from 'react';

export default class CadastrarCampanha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaCampanha: [],
      usuario: '',
      campanha: '',
      dataInicio: new Date(),
      dataFim: new Date(),
      arquivo: ''
    }
  };
  
  buscarCampanhas = () => {
    fetch('http://localhost:5000/api/Campanhas/ListarTodos')

    .then(resposta => resposta.json())
    
    .then(dados => this.setState({ listaUsuario: dados }))
  };
  
  componentDidMount(){
    this.buscarCampanhas()
  }
  
  
  render() {
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

        <section className="section_1">
          <div className="container_section">
            <h3>Cadastrar Campanha</h3>
            <div className="box_cadastrar">
              <h2 className="h2_cadastrar" >Cadastrar</h2>
              <form>
                <form onSubmit={this.cadastrarCampanha}>
                  <div className="box_form"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '20vw',
                    }}
                    >
                    <input type="text"
                      placeholder="Nome da Campanha:"
                      />
                    <input type="date"
                      placeholder="Data de Início:"
                      />
                    <input type="date"
                      placeholder="Data de Expiração"
                      />
                    <input className="input_file" type="file"
                    />
                    <button className="cadastrar_campanha">
                      <img className="img_cadastrar" src={cadastrar} alt="botão cadastrar" />
                    </button>
                    <button className="cadastrar_campanha_2">
                      <img className="img_cadastrar" src={cadastrar_resp} alt="botão cadastrar" />
                    </button>
                  </div>
                </form>
              </form>
            </div>


            <div className="box_preview">
              <img className="img_exemplo" src={exemplo} alt="imagem exemplo" />
              <div className="controle_preview">
                <img className="botao_controle" src={esquerda} alt="botão esquerda" />
                <img className="botao_controle" src={direita} alt="botão direita" />
              </div>
            </div>
          </div>
        </section>

        <section className="section_2">
          <div className="container_section_2">
            <div className="box_registro">
              <h2 className="h2_registro" >Registros</h2>
              <div className="container_table">
                <table>
                  <div className="box_table">
                    <thead className="box_thead">
                      <tr>
                        <th>Nome da Campanha</th>
                        <th>Usuário</th>
                        <th>Data de Publicação</th>
                        <th>Data de Expiração</th>
                        <th>Ações</th>
                      </tr>
                    </thead>

                    <tbody className='tb'>
                      {this.state.listaCampanha.map((campanhas) => {
                        return (
                          <tr key={campanhas.idCamapnha}>
                            <td>{campanhas.nomeCampanha}</td>
                            <td> teste</td>
                            <td></td>
                            <td></td>
                            <td>
                              <div className="box_botao">
                                <button className="botao_acoes"><img className="img_acoes" src={editar} alt="" /></button>
                                <button className="botao_acoes"><img className="img_acoes" src={excluir} alt="" /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
}


