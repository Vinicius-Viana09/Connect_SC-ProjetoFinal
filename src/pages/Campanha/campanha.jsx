import { Component } from 'react';
import '../../assets/css/campanha.css'

export default class Campanha extends Component {
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

    buscarCampanhas = () => {
        fetch('http://localhost:5000/api/Campanhas/ListarTodos')

            .then(resposta => resposta.json())

            .then(dados => this.setState({ listaCampanha: dados }))
    };

    componentDidMount() {
        this.buscarCampanhas()
    }

    render() {
        return (
            <main>
                <section></section>
            </main>
        )
    }
}