import React, { useState, useEffect, useRef } from 'react';
import '../global';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Store from '../components/Store';
import { MapsComponent } from '../components/MapsComponent';
import { CARD_WIDTH } from '../components/Store';
import { Marker } from 'react-native-maps';
import MyButton from '../components/MyButton';
import { init } from '../server/Web3Client'
import { LogBox } from 'react-native';
import * as Location from 'expo-location';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MapScreen = ({navigation}) => {
  const [ longitude, setLongitude ] = useState(0);
  const [ latitude, setLatitude ] = useState(0);

  const [ offsetStart, setOffsetStart ] = useState(0);
  const [ index, setIndex ] = useState(0)
  const [ locations, setLocations ] = useState();

  const [ loading, setLoading ] = useState(true);
  const [ currentLocation, setCurrentLocation ] = useState({});
  const [isLocationAvailable, setIsLocationAvailable] = useState(false); 
  const x = new Animated.Value(0);

  const flatListRef = useRef(null);

  const updatePosition = (index) => {
    setLatitude(locations[index].lat);
    setLongitude(locations[index].lon);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('No fue permitido el acceso a la ubicación');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setIsLocationAvailable(true);
      setCurrentLocation(location);
    })();
  }, []);

  useEffect(() => {
    init(setLocations).then(() => setLoading(false)).catch(() => console.error("Error Loading from BlockChain"));
  }, []);

  useEffect(() => {
    if (isLocationAvailable) { // Verificar si la ubicación está disponible
      init(setLocations)
        .then(() => setLoading(false))
        .catch((err) => console.error('Error al cargar desde BlockChain', err));
    }
  }, [isLocationAvailable]); // Ejecutar solo cuando la ubicación está disponible
  
  const updateState = (event) => {
    let position = event.nativeEvent.contentOffset.x;
    let i = Math.floor((position - offsetStart) / CARD_WIDTH)
    if(index !== i){
      updatePosition(i);
      setIndex(i);
    }
  }

  const onClickMarker = (index) => {
    console.log(`Clickeado master ${index}`);
    updatePosition(index);
    setIndex(index);
    if (flatListRef.current && typeof index === 'number') {
      flatListRef.current.scrollToIndex({index});
    }
  }

  const onScroll = Animated.event(
    [{ nativeEvent: { 
      contentOffset: { x } 
    }}], { 
      listener: (event) => updateState(event), 
      useNativeDriver: true , 
    }
  );

  const _updateRangePositions = (offsetStart) => {
    setOffsetStart(offsetStart)
  }

  return (
      <View style={{flex:1}}>
        <MapsComponent latitude={ latitude } longitude={ longitude }>
          {!loading && locations.map((Loc, index) => 
            <Marker 
              key={'marker'+index}
              coordinate={{
                latitude: Loc.lat,
                longitude: Loc.lon,
              }} 
              title={Loc.name}
              onPress={() => onClickMarker(index)}
              style={{width: 26, height: 28}}
            />
          )}
        </MapsComponent>  
        {loading ? 
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} />
          </View> 
          : 
          <View style={styles.listStores}>
            <AnimatedFlatList
              ref={flatListRef}
              onScroll={onScroll}
              scrollEventThrottle={16}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={locations}
              renderItem={({ index, item }) => (
                <Store 
                  key={index}
                  index={index} 
                  item={item} 
                  x={x} 
                  updateRangePositions={_updateRangePositions} 
                />
              )}
              keyExtractor={(item) => `${item.id}-${item.name}`}
            /> 
          </View>
        }
        <MyButton navigation={navigation} curLocation={currentLocation.coords} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 50,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  listStores:{    
    marginBottom:15,
    width: '100%', 
    position: 'absolute',
    bottom: 0
  },
  button:{
    color: 'black',
  }
});

export default MapScreen;