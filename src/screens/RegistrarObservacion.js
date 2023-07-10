import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Image, ImageBackground, ScrollView } from 'react-native'
import { Button } from 'react-native-elements';
import ObservationContext from '../provider/ObservacionProvider';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import MapView from 'react-native-maps';

const RegistrarObservacion = ({ route, navigation }) => {

    //Si recive parametros del route, toma los valores de esos parametros, sino crea un objeto nuevo
    const [observation, setObservation] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(ObservationContext)

    //Creacion de estados para setearle valores mas adelante//
    const [title, setTitle] = useState("");
    const [latitud, setLatitud] = useState();
    const [longitud, setLongitud] = useState();

    //Valores para el select list//
    const data = [
        { key: '1', value: 'Plaga detectada' },
        { key: '2', value: 'Planta en mal estado' },
        { key: '3', value: 'Falta de riego' }
    ];

    //Selector de imagen//
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

    //Funcion para guardar los datos de latitud y longitud al moverse el mapa//
    const regionChange = (region) => {
        let latitude = parseFloat(region.latitude);
        let longitude = parseFloat(region.longitude);

        setLatitud(latitude.toString());
        setLongitud(longitude.toString());
    }

    //Validacion de datos//
    const handleValidate = () => {

        if (!observation.titulo) {
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

    //Creacion o modificacion y guardado del objeto//
    const handleSave = () => {

        setObservation(...observation.titulo = title)
        setObservation(observation.longitud = longitud);
        setObservation(observation.latitud = latitud);

        if (handleValidate()) {
            dispatch({
                type: observation && observation.id ? "updateObservation" : "createObservation",
                payload: observation
            })
            // Volver a atras
            navigation.goBack()
        }
    }

    //Guardar el titulo seleccionado//
    const saveTitle = (title) => {
        setTitle(title);
    }
    return (
        <ImageBackground source={require('../../assets/backgroundObReg.jpg')} resizeMode="cover" style={{
            flex: 1
        }}>
            <ScrollView style={{ marginHorizontal: 20}}>
                <View style={styles.form}>

                    <Text style={{ fontWeight: "bold" }}>Seleccione un título</Text>
                    <SelectList
                        dropdownStyles={{ backgroundColor: "white" }}
                        placeholder='Titulo'
                        setSelected={(value) => saveTitle(value)}
                        data={data}
                        save="value"
                    />

                    <Text style={{ fontWeight: "bold" }}>Seleccione una foto</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Imagen" onPress={pickImage} />
                    </View>
                    <View style={styles.imageContainer}>
                        {observation && observation.foto && <Image source={{ uri: observation.foto }} style={{ width: 100, height: 100 }} />}
                    </View>

                    <Text style={{ fontWeight: "bold" }}>Latitud</Text>
                    <TextInput
                        placeholder="Ingrese latitud"
                        value={latitud}
                        editable={false}
                        style={styles.input}
                    />

                    <Text style={{ fontWeight: "bold" }}>Longitud</Text>
                    <TextInput
                        placeholder="Ingrese longitud"
                        value={longitud}
                        editable={false}
                        style={styles.input}
                    />

                    <MapView
                        style={styles.map}
                        onRegionChange={regionChange}
                        initialRegion={{
                            latitude: -34.185221367760356,
                            longitude: -57.56412115987714,
                            latitudeDelta: 1.1518808693069502,
                            longitudeDelta: 1.4355648175064175,
                        }}
                    >

                    </MapView>
                    <Button
                        title='Guardar'
                        onPress={handleSave}
                    />
                </View>
            </ScrollView>

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
    },
    map: {
        width: '80%',
        height: '40%',
        marginBottom: 15,
        marginLeft: 30
    }

})

export default RegistrarObservacion