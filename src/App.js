import React from 'react';
import routes from './routes'

import './App.css';
import { withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
Test Content
{routes}
      <h1>Hello World</h1>
      {routes}
    </div>
  );
}

export default withRouter(App);
