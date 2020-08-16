import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
<<<<<<< HEAD
import {HashRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <Router><React.StrictMode>
    <App />
  </React.StrictMode></Router>,
=======
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>,
>>>>>>> 93c39de51e8ef16e25e93dd22202de22a4dfb6c2
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
