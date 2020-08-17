import React from 'react'
import {Switch, Route} from 'react-router-dom'
import DropZone from './Components/DropZone'
import Auth from './Components/Auth/Auth'
import Dash from './Components/Dash/Dash'
import Profile from './Components/Profile/Profile'
 
export default (
    <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route path="/dash" component={Dash} />
        <Route path='/drop' component={DropZone}  />
        <Route path='/profile' component={Profile} />
     </Switch>
)