import React,{useContext } from 'react';
import Context from './context';
import {Route} from 'react-router-dom';



const ProtectedRoute = ({component:Component, ...rest}) =>{


    const {state} = useContext(Context);


}


export default ProtectedRoute;