import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import GoogleLogin from 'react-google-login';


const Login = ({classes}) =>{



    return (
         <GoogleLogin clientId={"840634021113-3il8jjrjuebchbl2j08kj26cqm0tgiva.apps.googleusercontent.com"}/>
    )
}

const styles ={

    root:{
        height:"100vh",
        display:"flex",
        justifyContent:"center"
    }
}

export default Login