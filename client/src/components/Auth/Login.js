import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import GoogleLogin from 'react-google-login';
import { GraphQLClient } from "graphql-request"


const ME_Query = `
{
  me{
    _id
    name
    email
    picture
  }
}`


const Login = ({classes}) =>{
    
    const onSuccess = async googleUser =>{
        console.log(googleUser)

      const idToken = googleUser.getAuthResponse().id_token

     const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken }
      })

      const data = await client.request(ME_Query);

      console.log({data});
      
    }



    return (
         <GoogleLogin clientId={"840634021113-3il8jjrjuebchbl2j08kj26cqm0tgiva.apps.googleusercontent.com"}
          buttonText="Login"
          onSuccess={onSuccess}
          isSignedIn={true}
         
          />
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

export default Login