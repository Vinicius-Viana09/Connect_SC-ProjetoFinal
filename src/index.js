import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

import reportWebVitals from './reportWebVitals';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/login.jsx';
import CadastroUsuario from './pages/CadastroUsuario/cadastro';
import ListaUsuario from './pages/ListaUsuario/listausuario';
import TelaPainel from './pages/TelaPainel/ListaCampanha';
import RespRegistroCampanha from './pages/RegistroCampResponsivo/RegCamanhasResponsivo.jsx';

const routing = (
  <BrowserRouter>
    <div>
      <Routes>
        <Route index element={<Login />} /> {/* Login */}
        <Route exact path="/Home" element={usuarioAutenticado() && parseJwt().role === '1' || usuarioAutenticado() && parseJwt().role === '2' ? <Home/> : <Navigate to='/' />} /> {/* Home */}
        <Route exact path="/ListUser" element={usuarioAutenticado() && parseJwt().role === '1' ? <ListaUsuario/> : <Navigate to='/' />} /> {/* Listagem de Usuário */}
        <Route exact path="/CadastroUser" element={usuarioAutenticado() && parseJwt().role === '1' ? <CadastroUsuario/> : <Navigate to='/' />} /> {/* Cadastro de Usuário */}
        <Route exact path="/Painel" element={usuarioAutenticado() && parseJwt().role === '3' ? <TelaPainel/> : <Navigate to='/'/>} /> 
        <Route exact path="/ListCampanha" element={<RespRegistroCampanha/>} />
      </Routes>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
