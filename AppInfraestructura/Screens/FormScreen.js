import React, {useState, useEffect} from "react";
import { Text, StyleSheet, SafeAreaView, TextInput, View, TouchableOpacity, Image, ToastAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; 
import { uploadToEth, logger } from "../server/Web3Client";

const FormScreen = ({navigation, route}) => {
    const [title, onChangeTitle] = React.useState('');
    const [desc, onChangeDesc] = React.useState('');
    const [photo, setPhoto] = useState(null);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Has rechazado los permisos para acceder a tu cámara");
          return;
        }
    
        const result = await ImagePicker.launchCameraAsync({
            base64: true,
            quality: 1,
        });
    
        if (!result.cancelled) {
            setPhoto(result);
        }
    }

    const uploadToImgur = async (photoInfo) => {
        try {
            const base64Image = photoInfo.base64;
            const absoluteUri = photoInfo.uri;
        
            const apiKey = 'b47febc068bbedd';
            const apiUrl = 'https://api.imgur.com/3/image';
        
            const formData = new FormData();
            formData.append('image', {
              uri: absoluteUri,
              type: 'image/jpeg',
              name: 'image.jpg',
              data: base64Image,
            });
        
            const config = {
              headers: {
                Authorization: `Client-ID ${apiKey}`,
                'Content-Type': 'multipart/form-data',
              },
            };
            
            const response = await axios.post(apiUrl, formData, config);
        
            console.log(JSON.stringify(response.data.data, null, 2));
            return response.data.data.link;
          } catch (error) {
            console.log('Error al subir la imagen:', error);
          }
    };

    const handleUpdate = async () => {
        ToastAndroid.show('Reporte subido con exito.', ToastAndroid.SHORT);
        const link = await uploadToImgur(photo);
        uploadToEth(title, link, route.params.latVal, route.params.lonVal, desc);
    }

    return (
        <SafeAreaView>
            <Text style={styles.text}>Ingresa el titulo de la falla infraestuctural: </Text>
            <TextInput
                style={styles.title}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Titulo Reporte"
                keyboardType="text"
            />
            <Text style={styles.text}>Ingrese una descripcion de falla: </Text>
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={text => onChangeDesc(text)}
                value={desc}
                style={styles.desc}
                placeholder="Descripcion Reporte"
            />
            <View style={styles.container}>
                <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="add-a-photo" size={15} color="black" />
                        <Text style={{ fontSize: 18, color: 'white', marginLeft: 5 }}>
                            Tomar Foto
                        </Text>
                    </View>
                </TouchableOpacity>
                {photo && <Image source={{ uri: photo.uri }} style={{ width: 200, height: 200, marginTop: 30 }} />}
                {(title && desc && photo) && 
                    <TouchableOpacity onPress={handleUpdate} style={styles.reportButton}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'blue' }}>
                            Realizar Reporte
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        margin: 12,
        fontSize: 15,
    },
    desc: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },
    photoButton: {
        backgroundColor: 'red',
        padding: 7,
        borderRadius: 15,
        color: 'black',
    },
    reportButton: {
        marginTop: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 15,
        color: '#2196f3',
    }
});

export default FormScreen;