import React from 'react';
import routes from './routes'
import './App.css';
import { withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      Test Content
      <h1>Change in APP.js</h1>
      {routes}
    </div>
  );
}

export default withRouter(App);
