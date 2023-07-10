import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Image, ImageBackground, ScrollView } from 'react-native'
import { Button } from 'react-native-elements';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { Calendar } from 'react-native-calendars';
import * as ImagePicker from 'expo-image-picker';

import UserContext from '../provider/UsersProvider';
import TratamientosContext from '../provider/TratamientoProvider';
import SupplyContext from '../provider/SupplyProvider';
import ZoneContext from '../provider/ZonesProvider';
import ObservationContext from '../provider/ObservacionProvider';

const RegistrarTratamiento = ({ route, navigation }) => {

    //Si recive parametros del route, toma los valores de esos parametros, sino crea un objeto nuevo
    const [tratamiento, setTratamiento] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(TratamientosContext);

    //Toma de estados de los providers de Users, Supply, Zone y Observation//
    const { stateU } = useContext(UserContext);
    const { stateS } = useContext(SupplyContext);
    const { stateZ } = useContext(ZoneContext);
    const { stateO } = useContext(ObservationContext);

    //Creacion de estados para utilizarlos mas adelante//
    const [selected, setSelected] = useState('');
    const [selectedTwo, setSelectedTwo] = useState('');
    const [insumosTrat, setInsumosTrat] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [atributoZona, setAtributoZona] = useState("");
    const [atributoUser, setAtributoUser] = useState("");
    const [atributoObservacion, setAtributoObservacion] = useState("");

    //Seteo de estados con los state de users, zones, supplies y observations//
    const [users, setUsers] = useState(stateU.Users);
    const [zona, setZona] = useState(stateZ.Zones);
    const [insumo, setInsumo] = useState(stateS.Supplies);
    const [observacion, setObservacion] = useState(stateO.Observations);

    //Datos para un selectList//
    const data = [
        { key: '1', value: 'Fumigación' },
        { key: '2', value: 'Riego' },
        { key: '3', value: 'Revisión' }
    ];

    //Listas creadas para cargarle datos y utilizarlas en los selectList//
    const dataUsers = [];
    const dataZona = [];
    const dataInsumo = [];
    const dataObservacion = [];

    //Carga de datos de usuarios para el selectList
    const DatosUsuarios = (users) => {
        users.map((user) => {
            dataUsers.push({
                key: user.id,
                value: user.name + " " + user.apellido
            })
        })
    }
    DatosUsuarios(users);

    //Carga de datos de zonas para el selectList
    const DatosZonas = (zones) => {
        zones.map((zone) => {
            dataZona.push({
                key: zone.id,
                value: zone.lugar + " " + zone.departamento
            })
        })
    }
    DatosZonas(zona)

    //Carga de datos de insumos para el selectList
    const DatosSupplies = (supp) => {
        supp.map((sup) => {
            dataInsumo.push({
                key: sup.id + " - ",
                value: sup.name
            })
        })
    }
    DatosSupplies(insumo)

    //Carga de datos de observaciones para el selectList
    const DatosObservaciones = (observaciones) => {
        observaciones.map((observacion) => {
            dataObservacion.push({
                key: observacion.id + " - ",
                value: observacion.titulo
            })
        })
    }
    DatosObservaciones(observacion)
    
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

        setTratamiento({ ...tratamiento, orden: result.assets[0].uri })
    };

    //Validacion de datos//
    const handleValidate = () => {

        if (!tratamiento.name) {
            Alert.alert('Nombre invalido', 'Debe ingresar un nombre valido')
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
        
        return true
    }

    //Crear o modificar un objeto y guardarlo//
    const handleSave = () => {
        setTratamiento( tratamiento.name = titulo )
        setTratamiento( tratamiento.zone = atributoZona )
        setTratamiento( tratamiento.user = atributoUser )
        setTratamiento( tratamiento.inicio = selected )
        setTratamiento( tratamiento.fin = selectedTwo )
        setTratamiento( tratamiento.insumos = insumosTrat )
        setTratamiento( tratamiento.observaciones = atributoObservacion )

        if (handleValidate()) {
            dispatch({
                type: tratamiento && tratamiento.id ? "updateTratamiento" : "createTratamiento",
                payload: tratamiento
            })
            // Volver a atras
            navigation.goBack()
        }
    }

    //Guardar el titulo seleccionado//
    const saveTitle = (name) => {
        setTitulo(name);
    }

    //Guardar el usuario seleccionado//
    const saveUser = (user) => {
        setAtributoUser(user);
    }

    //Guardar la zona seleccionada//
    const saveZona = (zona) => {
        setAtributoZona(zona);      
    }

    return (

        <ImageBackground source={require('../../assets/backgroundObReg.jpg')} resizeMode="cover" style={{
            flex: 1
        }}>
            <ScrollView>
                <View style={styles.form}>

                    <Text style={{ fontWeight: "bold" }}>Seleccione un nombre</Text>
                    <SelectList
                        boxStyles={{ backgroundColor: "white" }}
                        dropdownStyles={{ backgroundColor: "white" }}
                        placeholder='Nombre'
                        setSelected={(val) => saveTitle(val)}
                        data={data}
                        save="value"
                    />

                    <Text style={{ fontWeight: "bold" }}>Seleccione la zona</Text>
                    <SelectList
                        boxStyles={{ backgroundColor: "white" }}
                        dropdownStyles={{ backgroundColor: "white" }}
                        placeholder='Zonas'
                        setSelected={(val) => saveZona(val)}
                        data={dataZona}
                        save="key"
                    />

                    <Text style={{ fontWeight: "bold" }}>Seleccione el usuario</Text>
                    <SelectList
                        boxStyles={{ backgroundColor: "white" }}
                        dropdownStyles={{ backgroundColor: "white" }}
                        placeholder='Usuario'
                        setSelected={(val) => saveUser(val)}
                        data={dataUsers}
                        save="key"
                    />

                    <Text style={{ fontWeight: "bold" }}>Fecha de inicio</Text>
                    <Calendar
                        onDayPress={day => {
                            setSelected(day.dateString);                          
                        }}
                        markedDates={{
                            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                        }}
                    />

                    <Text style={{ fontWeight: "bold" }}>Fecha de fin</Text>
                    <Calendar
                        onDayPress={day => {
                            setSelectedTwo(day.dateString);
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


                    <Text style={{ fontWeight: "bold" }}>Seleccione los insumos</Text>
                    <MultipleSelectList
                        boxStyles={{ backgroundColor: "white" }}
                        dropdownStyles={{ backgroundColor: "white" }}
                        placeholder='Insumos'
                        setSelected={(val) => setInsumosTrat(val)}
                        data={dataInsumo}
                        save="key"
                        label="Insumos seleccionados"
                    />

                    <Text style={{ fontWeight: "bold" }}>Seleccione una observacion</Text>
                    <MultipleSelectList
                        boxStyles={{ backgroundColor: "white", marginBottom: 5 }}
                        dropdownStyles={{ backgroundColor: "white" }}
                        placeholder='Observaciones'
                        setSelected={(val) => setAtributoObservacion(val)}
                        data={dataObservacion}
                        save="key"
                        label="Observaciones seleccionadas"
                    />

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