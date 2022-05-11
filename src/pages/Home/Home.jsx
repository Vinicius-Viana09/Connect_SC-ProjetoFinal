// ESSE É O CERTO!!

import '../../assets/css/Home.css';
import axios from 'axios';

import icone from '../../assets/img/icone.svg'
import user from '../../assets/img/user-icon.svg'
import cadastrar from '../../assets/img/cadastrar.svg'
import excluir from '../../assets/img/remover.svg'
import cadastrar_resp from '../../assets/img/btn cadastrar resp.svg'
import cadastroResp from '../../assets/img/cadastro resp.svg'
import { Component, React } from 'react';
import { Link } from "react-router-dom";
import { parseJwt, usuarioAutenticado } from '../../services/auth';

export default class CadastrarCampanha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaCampanha: [],
      idUsuario: parseJwt().jti,
      nomeCampanha: '',
      dataInicio: new Date(),
      dataFim: new Date(),
      descricao: '',
      arquivo: '',
      campanhaAtiva: 'false'
    }
  };


  buscarCampanhas = () => {
    fetch('http://localhost:5000/api/Campanhas/ListarTodos')

      .then(resposta => resposta.json())

      .then(dados => this.setState({ listaCampanha: dados }))
  };

  cadastrarCampanha = (event) => {
    // event.preventDefault();

    // this.setState({ isLoading: true });
    let formdata = new FormData();

    const target = document.getElementById('arquivo')
    const file = target.files[0]
    formdata.append('arquivo', file, file.name)

    formdata.append('idUsuario', this.state.idUsuario)
    formdata.append('nomeCampanha', this.state.nomeCampanha)
    formdata.append('dataInicio', this.state.dataInicio)
    formdata.append('dataFim', this.state.dataFim)
    formdata.append('arquivo', this.state.arquivo)
    formdata.append('descricao', this.state.descricao)
    formdata.append('campanhaAtiva', this.state.campanhaAtiva)

    console.log(formdata)

    axios
      .post('http://localhost:5000/api/Campanhas', formdata, {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('')
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

    window.location.reload(true)
  }

  excluirCampanha = (campanha) => {
    console.log('A campanha ' + campanha.idCampanha + ' foi excluida')
    fetch('http://localhost:5000/api/Campanhas/' + campanha.idCampanha,
      {
        method: 'DELETE'
      })

    window.location.reload(false)
  }

  preview(url) {
    document.getElementById("foto").src=URL.createObjectURL(url);
  }

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value })
    if (campo.target.name === 'arquivo') {
      this.preview(campo.target.files[0])
    }
  }

  componentDidMount() {
    this.buscarCampanhas()
  }


  render() {
    return (
      <div className="App">
        <header>
          <div className="container container_header">
            <div className="box_header">
              <h1 className="h1">Configurando Painel</h1>
              <img className="icon_header" src={icone} alt="icone" />
            </div>

            {parseJwt().role === "1" ? <Link to="/ListUser"><img className="icon_header" src={user} alt="icone usuário" /></Link> : <div></div>}

          </div>
          <img className="icon_registro" src={cadastroResp} alt="" />
        </header>

        <main className="main_home">
          <section className="section_1">
            <div className="container_section">
              <h3 className="h3">Cadastrar Campanha</h3>
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
                      className="input"
                      type="text"
                      placeholder="Nome da Campanha:"
                      name="nomeCampanha"
                      defaultValue={this.state.nomeCampanha}
                      required
                      onChange={this.atualizaStateCampo}
                    />

                    <input
                      className="input"
                      type="date"
                      placeholder="Data de Início:"
                      name="dataInicio"
                      defaultValue={this.state.dataInicio}
                      required
                      onChange={this.atualizaStateCampo}
                    />

                    <input
                      className="input"
                      type="date"
                      placeholder="Data de Expiração"
                      name="dataFim"
                      defaultValue={this.state.dataFim}
                      onChange={this.atualizaStateCampo}
                    />

                    <input
                      className="input"
                      type="text"
                      placeholder="Descrição"
                      name="descricao"
                      defaultValue={this.state.descricao}
                      onChange={this.atualizaStateCampo}
                    />

                    <div>
                      <label className="label" for="arquivo">Escolher Arquivo</label>
                      <input
                        className="input"
                        type="file"
                        name="arquivo"
                        id="arquivo"
                        accept="image/*"
                        value={this.state.arquivo}
                        onChange={this.atualizaStateCampo}
                      />
                      
                      <img id="foto" src="" width="100px" height="100px"/>
                    </div>

                    <button className="cadastrar_campanha"
                      type="submit"
                      onClick={this.cadastrarCampanha}
                    >
                      <img className="img_cadastrar" src={cadastrar} alt="botão cadastrar" />
                    </button>

                    <button className="cadastrar_campanha_2"
                      type="submit"
                      onClick={this.cadastrarCampanha}
                    >
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
                        <tr>
                          <th>Nome da Campanha</th>
                          <th>Usuário</th>
                          <th>Data de Início</th>
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
                                  <button
                                    type="button"
                                    className='botao_acoes'
                                    onClick={() => this.excluirCampanha(campanha)}
                                  >
                                    <img className="img_acoes" src={excluir}></img>
                                  </button>
                                  <input name="btn_ativar" className="checkbox" type="radio" />
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
        <footer></footer>
      </div>
    );
  };
}