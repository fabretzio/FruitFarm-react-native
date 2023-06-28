import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Image, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements';
import ObservationContext from '../provider/ObservacionProvider';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { database } from "../data/baseDeDatos";

const RegistrarObservacion = ({ route, navigation }) => {

    const [observation, setObservation] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(ObservationContext)

    const data = [
        { key: '1', value: 'Plaga detectada' },
        { key: '2', value: 'Planta en mal estado' },
        { key: '3', value: 'Falta de riego' }
    ]

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.canceled) {
            Alert.alert('Imagen cancelada', 'La seleccion de la imagen fue cancelada')
            return
        }

        setObservation({ ...observation, foto: result.assets[0].uri })
    };

    const handleValidate = () => {

        if (!observation.title) {
            Alert.alert('Titulo invalido', 'Debe ingresar un titulo valido')
            return false
        }

        if (!observation.foto) {
            Alert.alert('Foto invalida', 'Debe seleccionar una foto')
            return false
        }

        if (!observation.latitud) {
            Alert.alert('Latitud invalida', 'Debe ingresar una latitud')
            return false
        }

        if (!observation.longitud) {
            Alert.alert('Longitud invalida', 'Debe ingresar una longitud')
            return false
        }

        return true
    }

    const handleSave = () => {
        if (handleValidate()) {
            dispatch({
                type: observation && observation.id ? "updateObservation" : "createObservation",
                payload: observation
            })
            // Volver a atras
            navigation.goBack()
        }
    }

    const saveTitle = (title) => {
        setObservation({ ...observation, title })
    }
    return (
        <ImageBackground source={require('../../assets/backgroundObReg.jpg')} resizeMode="cover" style={{
            flex: 1
          }}>

        <View style={styles.form}>
            
            <Text style={{fontWeight:"bold"}}>Seleccione el título</Text>
            <SelectList
                dropdownStyles={{backgroundColor:"white"}}
                placeholder='Titulo'
                setSelected={(val) => saveTitle(val)}
                data={data}
                save="value"
            />

            <Text style={{fontWeight:"bold"}}>Seleccione una foto</Text>
            <View style={styles.buttonContainer}>
                <Button title="Imagen" onPress={pickImage} />
            </View>
            <View style={styles.imageContainer}>
                {observation && observation.foto && <Image source={{ uri: observation.foto }} style={{ width: 200, height: 200 }} />}
            </View>

            <Text style={{fontWeight:"bold"}}>Latitud</Text>
            <TextInput
                placeholder="Ingrese latitud"
                value={observation?.latitud}
                onChangeText={(latitud) => setObservation({ ...observation, latitud })}
                style={styles.input}
            />

            <Text style={{fontWeight:"bold"}}>Longitud</Text>
            <TextInput
                placeholder="Ingrese longitud"
                value={observation?.longitud}
                onChangeText={(longitud) => setObservation({ ...observation, longitud })}
                style={styles.input}
            />

            <Button
                title='Guardar'
                onPress={handleSave}
            />
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: "white"
    },
    buttonContainer: {
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10
    }

})

export default RegistrarObservacion