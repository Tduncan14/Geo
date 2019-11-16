import React,{useContext} from 'react';
import Context from '../../context'


const PinContent = ({classes}) =>{


   const { state } = useContext(Context)

   const { currentPin } = state;
 





    return(
        <div>
            PinContent
        </div>
    )
}


export default PinContent;
