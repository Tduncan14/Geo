import React,{useContext} from 'react';
import {GoogleLogout} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Context from '../../context';
import {unstable_useMediaQuery as useMediaQuery}  from '@material-ui/core/useMediaQuery'


const Signout = ({classes }) => {
 
  const mobileSize = useMediaQuery(('max-width:650px'))
  const {dispatch} = useContext(Context)

  const onSignout = () =>{

    dispatch({type:"SIGNOUT_USER"})

    console.log("signout user")
  }



    return (

        <GoogleLogout
         onLogoutSuccess={ onSignout}
         render={({onClick}) =>(

            <span className={classes.root} onClick={onClick}>
                <Typography
                 variant ="body1"
                 style={{display: mobileSize ? "none" :"block" }}
                 className={classes.buttonText}>
                    Signout
                </Typography> 
                <ExitToAppIcon className={classes.buttonIcon}/>
            </span>
         )} />
    )


    
}

const styles = {

    root:{
        cursor:"pointer",
        display:"flex",
        
    
    },
    buttonText:{
        color:"white"
    },
    buttonIcon:{
        marginLeft:"5px",
        color:"lightBlue"
    }
}


export default withStyles(styles)(Signout);
