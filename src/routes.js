import React from 'react'
<<<<<<< HEAD
import {Switch, Route} from 'react-router-dom'
import DropZone from './Components/DropZone'

export default (
    <Switch>
        <Route component={DropZone}  to='/drop'/>
=======
import {Switch, Route } from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Dash from './Components/Dash/Dash'
import Nav from './Components/Nav/Nav'



export default (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/dash" component={Dash} />
        <Route path="/nav" component={Nav}/>    
>>>>>>> 93c39de51e8ef16e25e93dd22202de22a4dfb6c2
    </Switch>
)