// ESSE É O CERTO!!

import '../../assets/css/RegCampResp.css';
import axios from 'axios';
import excluir from '../../assets/img/remover.svg'
import { Component, React } from 'react';

export default class CadastrarCampanha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaCampanha: [],
      IdUsuario: 0,
      nomeCampanha: "",
      dataInicio: new Date(),
      dataFim: new Date(),
      descricaoCampanha: "",
      arquivo: ""
    }
  };

  
  buscarCampanhas = () => {
    fetch('http://localhost:5000/api/Campanhas/ListarTodos')
    
    .then(resposta => resposta.json())
    
    .then(dados => this.setState({ listaCampanha: dados }))
  };
  
  cadastrarCampanha = () => {
    this.setState({ isLoading: true });
    

    let cadastro = {
      nomeCampanha: this.state.nomeCampanha,
      IdUsuario: this.state.IdUsuario,
      dataInicio: this.state.dataInicio,
      dataFim: this.state.dataFim,
      descricaoCampanha: this.state.descricaoCampanha,
      arquivo: this.state.arquivo,
    };
    
    axios.post('http://localhost:5000/api/Campanhas', cadastro, {
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
    }
    
    excluirCampanha = (campanha) => {
      console.log('A campanha ' + campanha.idCampanha + ' foi excluida')
      fetch('http://localhost:5000/api/Campanhas/' + campanha.idCampanha,
      {
        method: 'DELETE'
      })
      window.location.reload(true);
    }
    
    atualizaStateCampo = (campo) => {
      this.setState({ [campo.target.name]: campo.target.value })
    }
    
    componentDidMount() {
      this.buscarCampanhas()
      this.cadastrarCampanha()
    }
    

  render() {
    return (
      <div className="App">
        <main>
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
                                  <button
                                    type="button"
                                    className='botao_acoes'
                                    onClick={() => this.excluirCampanha(campanha)}
                                  >
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