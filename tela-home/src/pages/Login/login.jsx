import '../../assets/css/login.css';
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import React from 'react';
import icone from '../../assets/img/undraw.svg';
import logo from '../../assets/img/Logo Original.png';
import { Component } from 'react';
import axios from "axios";


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            erroMensagem: '',
            isLoading: false
        };
    };

    efetuarLogin = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true })

        axios.post('https://senai-tcc-backend.azurewebsites.net/api/Login', {
            email: this.state.email,
            senha: this.state.senha,

        })

            .then(resposta => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-login', resposta.data.token)
                    this.setState({ isLoading: false });

                    let base64 = localStorage.getItem('usuario-login').split('.')[1];
                    console.log(base64);

                    console.log(this.props);
                    console.log('Logado')

                    if (parseJwt().role === '1') {
                        window.location.href = "/Home"
                        console.log('estou logado: ' + usuarioAutenticado())
                    }

                    if (parseJwt().role === '2') {
                        window.location.href = "/Home"
                        console.log('estou logado: ' + usuarioAutenticado())
                    }

                    if (parseJwt().role === '3') {
                        window.location.href = "/Painel"
                        console.log('estou logado: ' + usuarioAutenticado())
                    }
    
                    else {
                        this.props.history.push('/Home');
                    }
                }

            })

            .catch(() => {
                this.setState({ erroMensagem: 'E-mail e/ou senha invalidos!', isLoading: false })
            })

    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    }

    render() {

        return (

            <body>
                <main className="main">

                    <div className="ladoBranco">
                        <img src={icone} alt="imagem" className="ilus" />
                    </div>

                    <div id="lado_vermelho">
                        <div className="quadrado">
                            <div className="logo_text">
                                <img className="logo_login" src={logo} alt="logo" />
                            </div>

                            <div className="formDiv">
                                <p className="text_respon">FAÇA O SEU LOGIN PARA ACESSAR A REDE</p>
                                <form className="form" onSubmit={this.efetuarLogin} action="">
                                    <div className="inputs">
                                        <div>
                                            <p>Email</p>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                name='email'
                                                value={this.state.email}
                                                onChange={this.atualizaStateCampo}
                                            />
                                        </div>
                                        <div>
                                            <p>Senha</p>
                                            <input
                                                placeholder="Senha"
                                                name='senha'
                                                value={this.state.senha}
                                                type="password"
                                                onChange={this.atualizaStateCampo}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <button
                                onClick={this.efetuarLogin}
                                disabled={ this.state.email === '' || this.state.senha === '' ? 'none' : '' }
                                type="submit"
                                value="Conectar"
                                className="botao"
                                id="botao_1">Entrar</button>
                        </div>

                    </div>
                </main>

            </body>

        );
    }
}

export default Login;

