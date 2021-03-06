import React, { useEffect,useState,useContext } from "react";
import {withStyles} from "@material-ui/core/styles"
import ReactMapGL,{NavigationControl,Marker, Popup} from 'react-map-gl';
import PinIcon from './PinIcon.js';
import Context from '../context';
import Blog from './Blog';
import { useClient } from '../client';
import{Subscription} from 'react-apollo'
import {GET_PINS_QUERY} from '../graphql/queries';
import differenceInMinutes from "date-fns/difference_in_minutes";
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import {DELETE_PIN_MUTATION} from '../graphql/mutations';
import {PIN_ADDED_SUBSCRIPTION,PIN_UPDATED_SUBSCRIPTION,PIN_DELETED_SUBSCRIPTION} from '../graphql/subscriptions';
import {unstable_useMediaQuery as useMediaQuery}  from '@material-ui/core/useMediaQuery'

const INITIAL_VIEWPORT = {

        latitude:37.7577,
        longitude:-122.4376,
        zoom:13


}


const Map = ({classes}) => {

    const client = useClient();

    const mobileSize = useMediaQuery('(max-width:650px)')
    const {dispatch,state} = useContext(Context)


    useEffect(() =>{

      getPins()
    }, [])


      const [viewport, setViewport] = useState(INITIAL_VIEWPORT)
      const [userPosition,setUserPosition] = useState(null) 
   
      useEffect(() =>{

        getUserPosition()
      },[])

    
  const [popup,setPopup] = useState(null);

  // remove pin if selected by author

  useEffect( () =>{

    const pinExists = popup && state.pins.findIndex(pin => pin._id ===
    popup._id) > -1


    if(!pinExists){
      setPopup(null)
    }


  }, [state.pins.length])
  
      const getPins = async () =>{

        const { getPins } = await client.request(GET_PINS_QUERY)
        console.log(getPins);

        dispatch({type:"GET_PINS",payload:getPins})
      }

      const getUserPosition = () =>{

        if("geolocation" in navigator){

          navigator.geolocation.getCurrentPosition(position => {
           const {latitude,longitude}  = position.coords

           setViewport({...viewport,latitude,longitude})

           setUserPosition({latitude,longitude});
          })
        }
      }

      const handleDeletePin =  async pin => {

       const variables = {pinId: pin._id}

      await client.request(DELETE_PIN_MUTATION, variables);

       setPopup(null)




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
       


      const highlightNewPin = pin =>{

       const newPin = differenceInMinutes(Date.now(),Number(pin.createdAt)) <= 30


        return newPin ? "limeGreen" : "darkblue";

      }

      const handleSelectPin = pin =>{

        setPopup(pin)
        dispatch({type:"SET_PIN",payload: pin})
      }

      const isAuthUser = () => state.currentUser._id === popup.author._id

    return(
        <>
        <div className = {mobileSize ? classes.rootMobile : classes.root}>
            <ReactMapGL
             width="100vw"
             height="calc(100vh - 64px"
             mapStyle="mapbox://styles/mapbox/satellite-streets-v9"
             mapboxApiAccessToken="pk.eyJ1IjoidGR1bmNhbjE0IiwiYSI6ImNrMzBkZzV0YzBtejczbnFpaWF1djF5MmEifQ.jRIjI6naGvYlyliQNO1IMg"
             scrollZoom ={!mobileSize}
             onViewportChange={newViewport => setViewport(newViewport)}
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
                longitude ={state.draft.longitude}
                >
                  
                  <PinIcon size={40} color={"lightblue"}/>
                </Marker>
            )}

            {/* createdPins */}
            {state.pins.map(pin =>(
                <Marker
                latitude = {pin.latitude}
                longitude = {pin.longitude}
                key={pin._id}
                >
 
                  <PinIcon 
                   onClick={() => handleSelectPin(pin)}
                  size ={40} color={highlightNewPin(pin)}/>
 
                </Marker>

            ))}
            {/* popup dialog */}

            {popup && (
              <Popup  
               anchor="top"
               latitude={popup.latitude}
               longitude={popup.longitude}
               closeOnClick={false}
               onClose={() => setPopup(null)}>
                  <img
                  className={classes.popupImage}
                      src={popup.image} 
                      alt={popup.title}/>


                      <div className={classes.popupTab}>
                        <Typography>
                          {popup.latitude.toFixed(6)},
                          {popup.longitude.toFixed(6)}
                        </Typography>

                        {isAuthUser() && (
                <Button onClick={() => handleDeletePin(popup)}>
                  <DeleteIcon className={classes.deleteIcon} />
                </Button>
              )}
                      </div>
               </Popup>
            )}

            </ReactMapGL>
            {/* subs */}
            <Subscription
             subscription={PIN_ADDED_SUBSCRIPTION} 
             onSubscriptionData={({subscriptionData}) =>{
              const {pinAdded} = subscriptionData.data 

              console.log({pinAdded})
               dispatch({type:"CREATE_PIN" ,payload:pinAdded})
             }}/>


<Subscription
             subscription={PIN_UPDATED_SUBSCRIPTION} 
             onSubscriptionData={({subscriptionData}) =>{
              const {pinUpdated} = subscriptionData.data 

              console.log({pinUpdated})
               dispatch({type:"CREATE_COMMENT" ,payload:pinUpdated})
             }}/>


<Subscription
             subscription={PIN_DELETED_SUBSCRIPTION} 
             onSubscriptionData={({subscriptionData}) =>{
              const {pinDeleted} = subscriptionData.data 

              console.log({pinDeleted})
               dispatch({type:"DELETE_PIN" ,payload:pinDeleted})
             }}/>
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
          objectFit: "cover",
          cursor:"pointer"
        },
        popupTab: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          zIndex:1
        }
}

export default withStyles(styles)(Map)