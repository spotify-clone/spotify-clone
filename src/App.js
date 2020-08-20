import React from 'react'
import routes from './routes'
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
 import { withRouter } from 'react-router-dom';


function App(props) {
  console.log(props)
  return (
    <div className="App">
          {props.location.pathname === "/" ? null : <Header history={props.location}/>}
        <div className='left' > 
          {props.location.pathname === "/" ? null : <Nav history={props.location}/>}
        </div>
          <div className='right' >
            {routes}
          </div>
    </div>
  );
}

export default withRouter(App);
