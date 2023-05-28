import React from 'react';
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'

export const MapsComponent = ({latitude, longitude, children}) => {
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.0019,
      longitudeDelta: 0.0019
    }

    return (
        <MapView
          style = {{...StyleSheet.absoluteFillObject}}
          region={region}
        >
          {children}
        </MapView>    
    );
};  