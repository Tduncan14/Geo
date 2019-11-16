import React,{useContext,useReducer} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Main from './pages/Main';
import Splash from './pages/Splash';
import "mapbox-gl/dist/mapbox-gl.css";
import Context from './context';
import reducer from './reducer';
import ProtectedRoute from './ProtectedRoute';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';

const wsLink = new WebSocketLink({
    uri:'ws://localhost:4000/graphql',
    options:{
        reconnect:true
    }
})

const client = new ApolloClient({
    link:wsLink,
    cache:new InMemoryCache
})


function App() {

  const initialState = useContext(Context)
  
  const[ state,dispatch] = useReducer(reducer,initialState)
 

  console.log(state,"this state");

  return (
    <Router>
      <ApolloProvider client={client}>
      <Context.Provider value={{state,dispatch}}>
      <Switch>
        <ProtectedRoute exact path="/" component={Main}/>
        <Route path="/login" component={Splash}/>
      </Switch>
      </Context.Provider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
