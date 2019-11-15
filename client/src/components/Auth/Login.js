import React,{useContext} from 'react';
import {withStyles} from "@material-ui/core/styles";
import GoogleLogin from 'react-google-login';
import { GraphQLClient } from "graphql-request"
import Context from '../../context';
import Typography from '@material-ui/core/Typography';
import {ME_QUERY} from '../../graphql/queries';
import {BASE_URL} from '../../client';

const Login = ({classes}) =>{

  const {dispatch} = useContext(Context)
    const onSuccess = async googleUser =>{
    

    try{
      const idToken = googleUser.getAuthResponse().id_token

      const client = new GraphQLClient(BASE_URL, {
         headers: { authorization: idToken }
       })
       
       // coming from the me query from the backend
       const {me} = await client.request(ME_QUERY);
 
       console.log(me,"this is me");
 
       console.log(`${googleUser.isSignedIn()} google`)
       
       dispatch({type: "LOGIN_USER" ,payload : me})
       dispatch({type: "IS_LOGGED_IN" ,payload : googleUser.isSignedIn()})
    }

    catch(err){

       onFailure(err);
    }
  
      
    }

    const onFailure = err => {

      console.log(`The error is ${err}`);
    }


    return (
      <div className={classes.root}>
        <Typography
         component="h1"
         variant="h3"
         gutterBottom
         noWrap
         style={{color:"rgb(66,133,144)"}}>
          
          Welcome
        </Typography>
         <GoogleLogin clientId={"840634021113-3il8jjrjuebchbl2j08kj26cqm0tgiva.apps.googleusercontent.com"}
          buttonText="Login"
          onSuccess={onSuccess}
          isSignedIn={true}
          onFailure={onFailure}
          theme ="dark"
          />
          </div>
    )
}

const styles = {
    root: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center"
    }
  };

export default withStyles(styles)(Login)