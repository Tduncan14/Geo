import React ,{Component} from 'react';
import withRoot from "../withRoot";


 class Main extends Component {

    constructor(props){
        super(props)

        this.state={}
    }

    render(){

        return(
            <div>
                This is from the main
            </div>
        )
    }
 }



export default withRoot(Main);