import React  from 'react';
import withRoot from "../withRoot";
import Header from '../Components/Header';
import Map from '../Components/Map';
 const Main = () =>{



  return(
      <>
      <Header />
      <Map />
    </>
  )
 }

export default withRoot(Main);