import React,{useState,useContext,useEffect} from 'react';
import Context from '../context';
import NoContent from '../Components/Pin/NoContent';
import CreatePin from '../Components/Pin/CreatePin';




const Blog = ({classes}) => {

    const {state,dipatch}= useContext(Context);

    const {draft} = state;

    let BlogContent;

    if(!draft){
        // noContext
    }
    else if(draft){
        //create pin
    }

    const [blog,setBlog] = useState(null);



    return(
        <>
        <div>
            Blog
        </div>


        </>
    )
}


export default Blog;