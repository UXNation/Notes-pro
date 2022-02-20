import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/checkboxController.css';
import {store} from './store.js';
import {Provider} from 'react-redux';
import Routerr from './Router.jsx';

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
     
    <Routerr/>
   
    </Provider>,

  </React.StrictMode>,
  document.getElementById('root')
);

