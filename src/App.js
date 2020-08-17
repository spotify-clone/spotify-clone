import React from 'react'
import routes from './routes'
import './App.css';
import Nav from './Components/Nav/Nav'
import { withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      Test Content
      <h1>Nicholas made a change</h1>
      <Nav />
      {routes}
    </div>
  );
}

export default withRouter(App);
