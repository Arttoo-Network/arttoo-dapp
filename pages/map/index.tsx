'use client'

import React, { use, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {APIProvider, Map, useMarkerRef, Marker, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
console.log('apiKey', apiKey)
console.log('apiKey', apiKey)
function MyComponent() {
  
  const [markerRef, marker] = useMarkerRef();
  const [markerRef2] = useMarkerRef();

  const [artworks, setArtworks] = useState([])

  const hello = async () => {
    const uri = "/api/hello";

    const resp = await fetch(uri, {
      method: "GET",
    });
  }

  const getArtworks = async () => {
    const uri = "/api/artworks-all"; 

    const resp = await fetch(uri, {
      method: "GET",
    });

    const data = await resp.json();
    setArtworks(data)
  }

  useEffect(() => {
    hello()
    getArtworks()
  }, [])

  return (
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId={'b1b1b1b1b1b1b1b1'}
    >
      {/* <Marker ref={markerRef} position={{lat: 53.54992, lng: 10.00678}} /> */}
      <AdvancedMarker position={{lat: 53.54992, lng: 10.00678}}>
        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
      </AdvancedMarker>

      <AdvancedMarker
        // className={customMarker}
        position={{lat: 53.54992, lng: 10.00678}}>
        <h2>I am so customized</h2>
        <p>That is pretty awesome!</p>
      </AdvancedMarker>
    </Map>
  )
}

export default React.memo(MyComponent)
