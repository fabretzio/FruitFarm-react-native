import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import TratamientosContext from '../provider/TratamientoProvider';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { Calendar } from 'react-native-calendars';
import * as ImagePicker from 'expo-image-picker';
import DocumentPicker from 'react-native-document-picker'
import { useEffect } from 'react';

const RegistrarTratamiento = ({ route, navigation }) => {

    const [tratamiento, setTratamiento] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(TratamientosContext)
    const [selected, setSelected] = useState('');
    const [selectedTwo, setSelectedTwo] = useState('');
    const [documento, setDocumento] = useState('');
    const [insumosTrat, setInsumosTrat] = useState([]);

    const [users, setUsers] = useState("");
    const [zona, setZona] = useState("");
    const [insumo, setInsumo] = useState("");
    const [observacion, setObservacion] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const usuarios = await database.getUsers();
                const zonas = await database.getZones();
                const insumos = await database.getSupply();
                const observaciones = await database.getObservacion();

                setUsers(usuarios);
                setZona(zonas);
                setInsumo(insumos);
                setObservacion(observaciones);
            } catch (error) {
                console.log("Error on loadData RegistrarTratamiento: ", error);
            }
        }
        loadData().then(() => console.log("Cargando datos"));
    }, [])



    const data = [
        { key: '1', value: 'Fumigación' },
        { key: '2', value: 'Riego' },
        { key: '3', value: 'Revisión' }
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

        setTratamiento({ ...tratamiento, orden: result.assets[0].uri })
    };

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocumento(res);
            setTratamiento({ ...tratamiento, orden: res.name })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert('Se cancelo la seleccion del documento');
            } else {
                alert('Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const handleValidate = () => {

        if (!tratamiento.name) {
            Alert.alert('Nombre invalido', 'Debe ingresar un npmbre valido')
            return false
        }

        if (!tratamiento.zone) {
            Alert.alert('Zona invalida', 'Debe seleccionar una zona')
            return false
        }

        if (!tratamiento.user) {
            Alert.alert('Usuario invalido', 'Debe seleccionar un usuario')
            return false
        }

        if (!tratamiento.inicio) {
            Alert.alert('Fecha de inicio invalida', 'Debe seleccionar una fecha correcta')
            return false
        }
        if (!tratamiento.fin) {
            Alert.alert('Fecha de fin invalida', 'Debe seleccionar una fecha correcta')
            return false
        }
        if (!tratamiento.tiempo || tratamiento.tiempo < 0) {
            Alert.alert('Horas invalidas', 'Debe ingresar horas correctas')
            return false
        }
        if (!tratamiento.orden) {
            Alert.alert('Archivo invalido', 'Debe seleccionar una archivo correcto')
            return false
        }
        if (!tratamiento.insumos) {
            Alert.alert('Insumos invalidos', 'Debe seleccionar al menos un insumo')
            return false
        }
        if (!tratamiento.observaciones) {
            Alert.alert('Observación invalida', 'Debe tener al menos una observación')
            return false
        }

        return true
    }

    const handleSave = () => {
        if (handleValidate()) {
            dispatch({
                type: tratamiento && tratamiento.id ? "updateTratamiento" : "createTratamiento",
                payload: tratamiento
            })
            // Volver a atras
            navigation.goBack()
        }
    }

    const saveTitle = (name) => {
        setTratamiento({ ...tratamiento, name })
    }

    const saveUser = (user) => {
        setTratamiento({ ...tratamiento, user })
    }

    const saveOb = (ob) => {
        setTratamiento({ ...tratamiento, ob })
    }

    return (
        <ImageBackground source={require('../../assets/backgroundObReg.jpg')} resizeMode="cover" style={{
            flex: 1
        }}>

            <View style={styles.form}>

                <Text style={{ fontWeight: "bold" }}>Seleccione un nombre</Text>
                <SelectList
                    dropdownStyles={{ backgroundColor: "white" }}
                    placeholder='Nombre'
                    setSelected={(val) => saveTitle(val)}
                    data={data}
                    save="value"
                />

                <Text style={{ fontWeight: "bold" }}>Seleccione la zona</Text>
                <SelectList
                    dropdownStyles={{ backgroundColor: "white" }}
                    placeholder='Zonas'
                    setSelected={(val) => saveUser(val)}
                    data={zona}
                    save="value"
                />

                <Text style={{ fontWeight: "bold" }}>Seleccione el usuario</Text>
                <SelectList
                    dropdownStyles={{ backgroundColor: "white" }}
                    placeholder='Usuario'
                    setSelected={(val) => saveUser(val)}
                    data={users}
                    save="value"
                />

                <Text style={{ fontWeight: "bold" }}>Fecha de inicio</Text>
                <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                        setTratamiento({ ...tratamiento.inicio = day.dateString })
                    }}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                    }}
                />

                <Text style={{ fontWeight: "bold" }}>Fecha de fin</Text>
                <Calendar
                    onDayPress={day => {
                        setSelectedTwo(day.dateString);
                        setTratamiento({ ...tratamiento.inicio = day.dateString })
                    }}
                    markedDates={{
                        [selectedTwo]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                    }}
                />

                <Text style={{ fontWeight: "bold" }}>Tiempo</Text>
                <TextInput
                    placeholder="Ingrese las horas"
                    value={tratamiento?.tiempo}
                    onChangeText={(tiempo) => setTratamiento({ ...tratamiento, tiempo })}
                    style={styles.input}
                />

                <Text style={{ fontWeight: "bold" }}>Seleccione la orden</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Imagen" onPress={pickImage} />
                </View>
                <View style={styles.imageContainer}>
                    {tratamiento && tratamiento.orden && <Image source={{ uri: tratamiento.orden }} style={{ width: 200, height: 200 }} />}
                </View>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={pickDocument}>
                    <Text style={{ marginRight: 10, fontSize: 19 }}>
                        Seleccionar un documento
                    </Text>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                        }}
                        style={styles.imageIconStyle}
                    />
                </TouchableOpacity>


                <Text style={{ fontWeight: "bold" }}>Seleccione los insumos</Text>
                <MultipleSelectList
                    setSelected={(val) => setInsumosTrat(val)}
                    data={insumo}
                    save="value"
                    label="insumosTrat"
                    boxStyles={{ marginTop: 25 }}
                />

                <Text style={{ fontWeight: "bold" }}>Seleccione una observacion</Text>
                <SelectList
                    dropdownStyles={{ backgroundColor: "white" }}
                    placeholder='Observaciones'
                    setSelected={(val) => saveOb(val)}
                    data={observacion}
                    save="value"
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
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 5,
    },
    imageIconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
    },

})

export default RegistrarTratamiento