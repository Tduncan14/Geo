import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Main from './pages/Main';
import Splash from './pages/Splash';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/login" component={Splash}/>
      </Switch>
    </Router>
  );
}

export default App;
