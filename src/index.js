import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>


  </BrowserRouter>,

  document.getElementById('root')
);

