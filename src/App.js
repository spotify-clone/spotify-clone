import React from 'react'
import routes from './routes'
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Chat from './Components/Chat/Chat';
import { withRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header />
        <Nav />
       
        {/* <Chat /> */}
          {routes}
        
    </div>
  );
}

export default withRouter(App);
