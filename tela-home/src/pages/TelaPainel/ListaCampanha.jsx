import React, { Component } from "react";
import '../../assets/css/ListaCampanha.css';

export default class Campanha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaCampanha: [],

            idUsuario: '',
            nomeCampanha: '',
            dataInicio: new Date(),
            dataFim: new Date(),
            descricao: '',
            arquivo: ''
        }
    };

    buscarCampanhasAtivas = () => {
        fetch('https://senai-tcc-backend.azurewebsites.net/api/Campanhas/AtivoList')

            .then(resposta => resposta.json())

            .then(dados => this.setState({ listaCampanha: dados }))
    };

    componentDidMount() {
        this.buscarCampanhasAtivas()
    }

    render() {
        return (
            <body>
                <main className="mainCampanha">
                    <section className="imgCampanha">

                        {this.state.listaCampanha.map((campanha) => {
                            console.log(campanha.arquivo)
                            return (
                                <img className="imgCurso" src={"https://senai-tcc-backend.azurewebsites.net/staticfiles/images/" + campanha.arquivo} />
                            )
                        })}
                    </section>

                    <section className="infoCampanha">

                        {this.state.listaCampanha.map((campanha) => {
                            return (
                                <div className="divCamp">
                                    <h2>{campanha.nomeCampanha}</h2>
                                    <p>{campanha.descricao}</p>
                                </div>
                            )
                        })}
                    </section>

                </main>
            </body>
        );
    }
}