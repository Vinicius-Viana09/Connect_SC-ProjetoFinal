import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

// import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/login.jsx';
import CadastroUsuario from './pages/CadastroUsuario/cadastro';
import ListaUsuario from './pages/ListaUsuario/listausuario';
import RespRegistroCampanha from './pages/RegistroCampResponsivo/RegCamanhasResponsivo.jsx';

const routing = (
  <BrowserRouter>
    <div>
      <Routes>
        <Route exact path="/Home" element={<Home/>} /> {/* Home */}
        <Route exact path="/ListUser" element={<ListaUsuario/>} /> {/* Home */}
        <Route exact path="/CadastroUser" element={<CadastroUsuario/>} /> {/* Home */}
        <Route index element={<Login/>} /> {/* Login */}
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
