import React from 'react'
import routes from './routes'
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav'
import { withRouter } from 'react-router-dom';
import Boombox from '../src/boombox.png'

function App() {
  return (
    <div className="App">
      <Header />
      <img className="boombox" src={Boombox} alt="cassett" />
      <Nav />
      {routes}
      <Nav/>
    </div>
  );
}

export default withRouter(App);
