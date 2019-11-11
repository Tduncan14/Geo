import React, { useEffect,useState,useContext } from "react";
import {withStyles} from "@material-ui/core/styles"
import ReactMapGL,{NavigationControl,Marker} from 'react-map-gl';
import PinIcon from './PinIcon.js';
import Context from '../context';
import Blog from './Blog';

const INITIAL_VIEWPORT = {

        latitude:37.7577,
        longitude:-122.4376,
        zoom:13


}


const Map = ({classes}) => {


    const {dispatch,state} = useContext(Context)


      const [viewport, setViewport] = useState(INITIAL_VIEWPORT)
      const [userPosition,setUserPosition] = useState(null) 
      
      useEffect(() =>{

        getUserPosition()
      },[])

      const getUserPosition = () =>{

        if("geolocation" in navigator){

          navigator.geolocation.getCurrentPosition(position => {
           const {latitude,longitude}  = position.coords

           setViewport({...viewport,latitude,longitude})

           setUserPosition({latitude,longitude});
          })
        }
      }

        //  const newUserPosition = (event) =>{

        //   const {lngLat} = event;
          
        //   const newlatitude = lngLat[0];
        //   const  newlongitude = lngLat[1];
           

        //   navigator.geolocation.getCurrentPosition( position =>{

        //     let {latitude,longitude} = position.coords

        //      latitude = newlatitude;
        //      longitude = newlongitude;

            
        //    setViewport({...viewport,latitude,longitude})

        //    setUserPosition({latitude,longitude});


        //     })}
        const handleMapClick = ({ lngLat, leftButton }) => {
          if (!leftButton) return;
          if (!state.draft) {
            dispatch({ type: "CREATE_DRAFT" });
          }
          const [longitude, latitude] = lngLat;
          dispatch({
            type: "UPDATE_DRAFT_LOCATION",
            payload: { longitude, latitude }
          });
        };
       


      

    return(
        <>
        <div className = {classes.root}>
            <ReactMapGL
             width="100vw"
             height="calc(100vh - 64px"
             mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
             mapboxApiAccessToken="pk.eyJ1IjoidGR1bmNhbjE0IiwiYSI6ImNrMjltcnNoNTFyNTgzbXBldDhpeGFma20ifQ.sHwhRS9UlWefPCG7xjBQ6Q"
             onViewportChange={newViewport => setViewport(newViewport)
            }
            onClick ={handleMapClick}
             {...viewport}>
               <div className={classes.navigationControl}>
              <NavigationControl
               onViewportChange={newViewport => setViewport(newViewport)}/>
             </div>
             {/*  pin for usee's current positon */}

             
             {userPosition && (
             <Marker
               latitude = {userPosition.latitude}
               longitude = {userPosition.longitude}
               >

                 <PinIcon size ={40} color="blue"/>

               </Marker>
             )}

            {/* Draft pin area */}
            {state.draft && (
              <Marker  
                latitude ={state.draft.latitude}
                longitude ={state.draft.longitude}>
                  <PinIcon size={40} color={"lightblue"}/>
                </Marker>
            )}

            </ReactMapGL>

            {/* Blog area for pin content */}

             <Blog />
        </div>
        </>
    )
}



    const styles = {
        root: {
          display: "flex"
        },
        rootMobile: {
          display: "flex",
          flexDirection: "column-reverse"
        },
        navigationControl: {
          position: "absolute",
          top: 0,
          left: 0,
          margin: "1em"
        },
        deleteIcon: {
          color: "red"
        },
        popupImage: {
          padding: "0.4em",
          height: 200,
          width: 200,
          objectFit: "cover"
        },
        popupTab: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }
}

export default withStyles(styles)(Map)