import React,{useContext} from 'react';
import Login from '../Components/Auth/Login';
import Context from '../context'
import{ Redirect } from 'react-router-dom';


const Splash = () =>{
  
    const {state} = useContext(Context)
  
    console.log(state.currentUser ,state.isAuth,"IS AUTH")

    return state.isAuth ? <Redirect to ="/" /> : <Login />


}

export default Splash;