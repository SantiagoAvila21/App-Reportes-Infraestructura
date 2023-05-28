import React, { useState, useEffect, useRef } from 'react';
import './global';
import { LogBox } from 'react-native';
import MapScreen from './Screens/MapScreen';
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FormScreen from './Screens/FormScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MapScreen}
        />
        <Stack.Screen name="Formulario Reporte" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;