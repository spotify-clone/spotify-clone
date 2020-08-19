import React from 'react'
import routes from './routes'
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
 import { withRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header />
      <div id='left' >
        <Nav />
        </div>
        <div id='right' >
        {/* <Chat /> */}
          {routes}
          </div>
    </div>
  );
}

export default withRouter(App);
