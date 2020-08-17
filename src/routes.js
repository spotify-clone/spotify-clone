import React from 'react'
import {Switch, Route} from 'react-router-dom'
import DropZone from './Components/DropZone'
import Auth from './Components/Auth/Auth'
import Dash from './Components/Dash/Dash'
 
export default (
    <Switch>
        <Route   path="/auth" component={Auth} />
        <Route path="/dash" component={Dash} />
        <Route path='/drop' component={DropZone}  />
     </Switch>
)