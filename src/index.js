import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home/Home.jsx'
import TelaCampanha from './pages/Campanha/campanha.jsx'

const routing = (
  <BrowserRouter>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} /> {/* Home */}
        <Route exact path="/Campanha" element={<TelaCampanha/>} /> {/* Home */}
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
