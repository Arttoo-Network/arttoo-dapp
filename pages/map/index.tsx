import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {APIProvider, Map} from '@vis.gl/react-google-maps';


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
function MyComponent() {
  return (
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  )
}

export default React.memo(MyComponent)
