import React from 'react'
import routes from './routes'
import './App.css';
import { withRouter } from 'react-router-dom';
import Nav from './Components/Nav/Nav'

function App() {
  return (
    <div className="App">
      Test Content
      <h1>Nicholas made a change</h1>
      {routes}
      <Nav/>
    </div>
  );
}

export default withRouter(App);
