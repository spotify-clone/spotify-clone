import React from 'react'
import {Switch, Route} from 'react-router-dom'
import DropZone from './Components/DropZone'
import Auth from './Components/Auth/Auth'
import Dash from './Components/Dash/Dash'
import Nav from './Components/Nav/Nav'


export default (
    <Switch>
        <Route component={DropZone}  to='/drop'/>
        <Route exact path="/" component={Auth} />
        <Route path="/dash" component={Dash} />
        <Route path="/nav" component={Nav}/>    
    </Switch>
)