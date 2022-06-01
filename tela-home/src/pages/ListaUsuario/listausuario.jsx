import React, { Component } from "react";
import icone from '../../assets/img/icone.svg'
import user2 from '../../assets/img/lista_usuario.svg'
import Exc from '../../assets/img/remover.svg'
import Add from '../../assets/img/Add.png'
import '../../assets/css/listaUsuario.css'
import { Link } from "react-router-dom";
import axios from "axios";


export default class Listar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaUsuario: [],
            nome: '',
            email: '',
            tipoUsuario: '',
        }
    }

    buscarUsuarios = () => {
        axios.get('https://senai-tcc-backend.azurewebsites.net/api/Usuarios/Listar',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ listaUsuario: resposta.data })
                }
            })
    }

    excluirUsuarios = (usuario) => {
        console.log('O usuario' + usuario.idUsuario + 'foi excluido')
        fetch('https://senai-tcc-backend.azurewebsites.net/api/Usuarios/' + usuario.idUsuario,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(this.buscarUsuarios);
    }
    atualizaEstadoTitulo = async (event) => {
        await this.setState({ nome: event.target.value })
        console.log(this.state.nome)
    };


    componentDidMount() {
        this.buscarUsuarios()
    }


    render() {
        return (
            <body className='body'>
                <header>
                    <div className="container container_header">
                        <div className="box_header">
                            <Link className="link" to="/Home"><h1 className="h1_list_user">Gerenciando Usuários</h1></Link>
                            <img className="icon_header" src={icone} alt="icone" />
                        </div>
                    </div>
                </header>

                <main className="main_listUser">
                    <div className='titulo'>
                        <h2 className="h2_list_user">Usuários</h2>
                    </div>
                    <div className="listaResponsiva">
                        <div className="accordion">
                            <div className="label">João</div>
                            <div className="content">

                                <p> Lorem ipsum dolor sit amet
                                    consectetur adipisicing elit.
                                    Deserunt dicta rerum optio laboriosam
                                    officia pariatur sapiente animi.
                                    Consequatur explicabo pariatur culpa,
                                    harum ducimus consequuntur et.
                                    Recusandae tempore enim maxime! A.</p>
                            </div>
                        </div>
                    </div>
                    <table className='tabela'>
                        <div className="box_table">
                            <thead className='labels'>
                                <tr >
                                    <th>Id</th>
                                    <th>Usuário</th>
                                    <th>Email</th>
                                    <th>Tipo de Usuário</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className='icones'>
                                {this.state.listaUsuario.map((usuario) => {
                                    return (
                                        <tr key={usuario.idUsuario}>
                                            <td>{usuario.idUsuario}</td>
                                            <td>{usuario.nomeUsuario}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.idTipoUsuario}</td>
                                            <div className='funcoes'>
                                                {/* <button type='button'>
                                                <img src={Edit}></img>
                                            </button> */}
                                                <button type='button'
                                                    onClick={() => this.excluirUsuarios(usuario)}
                                                >
                                                    <img src={Exc}></img>
                                                </button>
                                            </div>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </div>
                    </table>
                    {/* <div>
                        <img id='button' src={Add} onClick={Redirect} ></img>
                    </div> */}

                    <Link to='/CadastroUser'>
                        <img className="button_addUser" id='button' src={Add} />
                    </Link>


                </main>
            </body>
        );
    }
};