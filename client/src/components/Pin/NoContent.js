import React from 'react';
import ExploreIcon from '@material-ui/icons/Explore';
import Typography from '@material-ui/core/Typography';


const NoContent = ({classes}) =>{









    return(
        <div>
           <ExploreIcon />

           <Typography 
              noWrap
              component="h2"
              variant="h6"
              align="center"
              color="textPrimary"
              gutterBottom>
                  Click left on mouse
              </Typography>

        </div>
    )
}


export default NoContent;
