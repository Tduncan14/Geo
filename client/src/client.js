import { useState,useEffect } from 'react';
import {GraphQLClient} from 'graphql-reque;
import { fromPromise } from 'apollo-link'


export const useClient = () => {

    const [idToken, setIdToken] = useState(" ")
  

     useEffect(() => {


        const token =window.gapi.auth2
        .getAuthInstance().currentUser
        .get().getAuthResponse().id_token;
    

     } , [] );
}