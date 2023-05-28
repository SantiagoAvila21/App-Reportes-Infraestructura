import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

const MyButton = ({navigation, curLocation}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('Formulario Reporte', {latVal: curLocation.latitude, lonVal: curLocation.longitude})}>
      <Text style={styles.buttonText}>+ Reportar Problema</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default MyButton;