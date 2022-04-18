// ESSE É O CERTO!!

import '../../assets/css/Home.css';
import axios from 'axios';

import icone from '../../assets/img/icone.svg'
import user from '../../assets/img/user-icon.svg'
import cadastrar from '../../assets/img/cadastrar.svg'
import editar from '../../assets/img/editar.svg'
import excluir from '../../assets/img/remover.svg'
import cadastrar_resp from '../../assets/img/btn cadastrar resp.svg'
import { Component, React } from 'react';

export default class CadastrarCampanha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaCampanha: [],
      usuario: '',
      nomeCampanha: '',
      dataInicio: new Date(),
      dataFim: new Date(),
      descricaoCampanha: '',
      arquivo: ''
    }
  };

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value })
  }

  buscarCampanhas = () => {
    fetch('http://localhost:5000/api/Campanhas/ListarTodos')

      .then(resposta => resposta.json())

      .then(dados => this.setState({ listaCampanha: dados }))
  };

  cadastrarCampanha = () => {
    this.setState({ isLoading: true });

    let cadastro = {
      nome: this.state.nomeCampanha,
      nomeUsuario: this.state.usuario,
      dataInicio: this.state.dataInicio,
      dataFim: this.state.dataFim,
      descricao: this.state.descricaoCampanha,
      image: this.state.arquivo,
    };

    axios
      .post('http://localhost:5000/api/Campanhas', cadastro, {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('usuario-login')
        },
      })
      .then((resposta) => {
        if (resposta.status === 201) {
          console.log('Campanha cadastrada!');
          this.setState({ isLoading: false })
        }
      })
      .catch((erro) => {
        console.log(erro);
        this.setState({ isLoading: false })
      })
      .then(this.buscarCampanhas);
  }



  componentDidMount() {
    this.buscarCampanhas()
    this.cadastrarCampanha()
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
                <form onSubmit={this.cadastrarCampanha}>
                  <div className="box_form"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '20vw',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Nome da Campanha:"
                      name="nomeCampanha"
                      value={this.state.nomeCampanha}
                      onChange={this.atualizaStateCampo}
                    />

                    <input
                      type="date"
                      placeholder="Data de Início:"
                      name="dataInicio"
                      value={this.state.dataInicio}
                      onChange={this.atualizaStateCampo}
                    />

                    <input
                      type="date"
                      placeholder="Data de Expiração"
                      name="dataFim"
                      value={this.state.dataFim}
                      onChange={this.atualizaStateCampo}
                    />

                    <input
                      type="text"
                      placeholder="Descrição"
                      name="descricao"
                      value={this.state.descricao}
                      onChange={this.atualizaStateCampo}
                    />

                    <div>
                      <label for="arquivo">Escolher Arquivo</label>
                      <input
                        type="file"
                        name="arquivo"
                        id="arquivo"
                        value={this.state.arquivo}
                        onChange={this.atualizaStateCampo}
                      />
                    </div>

                    <button className="cadastrar_campanha"
                      type="submit"
                      onClick={this.cadastrarCampanha}
                    >
                      <img className="img_cadastrar" src={cadastrar} alt="botão cadastrar" />
                    </button>

                    <button className="cadastrar_campanha_2">
                      <img className="img_cadastrar" src={cadastrar_resp} alt="botão cadastrar" />
                    </button>
                  </div>
                </form>
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
                        <tr >
                          <th>Nome da Campanha</th>
                          <th>Usuário</th>
                          <th>Data de Publicação</th>
                          <th>Data de Expiração</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.listaCampanha.map((campanha) => {
                          return (
                            <tr key={campanha.idCampanha}>
                              <td>{campanha.nomeCampanha}</td>
                              <td>{campanha.idUsuarioNavigation.nomeUsuario}</td>
                              <td>{Intl.DateTimeFormat("pt-BR", {
                                year: "numeric", month: "numeric", day: "numeric"
                              }).format(new Date(campanha.dataInicio))}</td>
                              <td>{Intl.DateTimeFormat("pt-BR", {
                                year: "numeric", month: "numeric", day: "numeric"
                              }).format(new Date(campanha.dataFim))}</td>
                              <td>
                                <div className='box_botao'>
                                  <button className='botao_acoes'>
                                    <img className="img_acoes" src={editar}></img>
                                  </button>
                                  <button className='botao_acoes'>
                                    <img className="img_acoes" src={excluir}></img>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
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