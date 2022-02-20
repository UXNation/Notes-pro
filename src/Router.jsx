import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage.jsx';

export default function Routerr(){

  return (<Router> 
  <Switch>
  
   <Route path='/notes' component={App}/>
   <Route path='/login-page' component={LoginPage}/>
   {
    localStorage.getItem('userNickname')===null?<Redirect to={'/login-page'}/>:
    <Redirect to={'/notes'}/>
   }
  </Switch> 
</Router>)
 ;
} 