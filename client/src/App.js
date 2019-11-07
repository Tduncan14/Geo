import React,{useContext,useReducer} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Main from './pages/Main';
import Splash from './pages/Splash';
import "mapbox-gl/dist/mapbox-gl.css";
import Context from './context';
import reducer from './reducer';
import ProtectedRoute from './ProtectedRoute';
function App() {

  const initialState = useContext(Context)
  
  const[ state,dispatch] = useReducer(reducer,initialState)
 

  console.log(state,"this state");

  return (
    <Router>
      <Context.Provider value={{state,dispatch}}>
      <Switch>
        <ProtectedRoute exact path="/" component={Main}/>
        <Route path="/login" component={Splash}/>
      </Switch>
      </Context.Provider>
    </Router>
  );
}

export default App;
