import '../../assets/css/RegCampResp.css';
import axios from 'axios';
import registro from '../../assets/img/registro.svg'
import excluir from '../../assets/img/remover.svg'
import { Component, React } from 'react';
import { parseJwt, usuarioAutenticado } from '../../services/auth';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      campanhaAtiva: 'true'
    }
  };

  buscarCampanhas = () => {
    fetch('http://localhost:5000/api/Campanhas/ListarTodos')

      .then(resposta => resposta.json())

      .then(dados => this.setState({ listaCampanha: dados }))
  };

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
  }

  render() {
    return (
      <div>
        <header>
          <img className="icon_registro" src={registro} alt="" />
        </header>

        <main className="main_resp_regcamp">
          <section className="">
            <div className="listaResponsiva">
              {this.state.listaCampanha.map((campanha) => {
                return (
                  <div>
                    <Accordion className="Accordion" >

                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          <h4 className="h4_resp"><li></li>{campanha.nomeCampanha}</h4>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography className="infoResponsivo">
                          <ul>
                            <h3 className="h3_resp_campanha">Usuário</h3>
                            <p className="p_info">{campanha.idUsuarioNavigation.nomeUsuario}</p>
                            <h3 className="h3_resp_campanha">Data de Início</h3>
                            <p className="p_info">{Intl.DateTimeFormat("pt-BR", {
                              year: "numeric", month: "numeric", day: "numeric"
                            }).format(new Date(campanha.dataInicio))}</p>
                            <h3 className="h3_resp_campanha">Data de Expiração</h3>
                            <p className="p_info">{Intl.DateTimeFormat("pt-BR", {
                              year: "numeric", month: "numeric", day: "numeric"
                            }).format(new Date(campanha.dataFim))}</p>
                          </ul>
                          <h3 className="h3_resp_campanha">Ações</h3>
                          <button className="botaoResp" type='button'
                            onClick={() => this.excluirCampanha(campanha)}
                          >
                            <img src={excluir}></img>
                          </button>
                        </Typography>
                      </AccordionDetails>
                      {/* Primeiro nome */}
                    </Accordion>
                  </div>
                )
              })}
            </div>
          </section>
        </main>
      </div>
    );
  };
}