import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list';
import { Button } from 'react-native-elements';
import ZoneContext from '../provider/ZonesProvider';
import MapView from 'react-native-maps';

const RegistrarZona = ({ route, navigation }) => {

    //Si recive parametros del route, toma los valores de esos parametros, sino crea un objeto nuevo
  const [zone, setZone] = useState(route.params ? route.params : {})
  const { dispatch } = useContext(ZoneContext)

  //Seteo de estados para latitud y longitud//
  const [latitud, setLatitud] = useState();
  const [longitud, setLongitud] = useState();

  //Datos para el selectList de departamentos//
  const deps = [{ key: '1', value: 'Colonia' }, 
                { key: '2', value: 'San José' }, 
                { key: '3', value: 'Montevideo' }, 
                { key: '4', value: 'Canelones' }, 
                { key: '5', value: 'Maldonado' }, 
                { key: '6', value: 'Rocha' }, 
                { key: '7', value: 'Lavalleja' }, 
                { key: '8', value: 'Flores' }, 
                { key: '9', value: 'Florida' }, 
                { key: '10', value: 'Treinta y tres' }, 
                { key: '11', value: 'Salto' }, 
                { key: '12', value: 'Rivera' }, 
                { key: '13', value: 'Tacuarembó' }, 
                { key: '14', value: 'Soriano' }, 
                { key: '15', value: 'Durazno' }, 
                { key: '16', value: 'Artigas' }, 
                { key: '17', value: 'Cerro Largo' }, 
                { key: '18', value: 'Río Negro' }, 
                { key: '19', value: 'Paysandú' }]

  //Datos para el selectList de nombre//
  const data = [
    { key: 'Estancia', value: 'Estancia' },
    { key: 'Quinta', value: 'Quinta' },
    { key: 'Estacion', value: 'Estacion' }
  ];

  //Validacion de datos//
  const handleValidate = () => {

    if (!zone.lugar) {
      Alert.alert('Lugar invalido', 'Debe seleccionar un lugar valido')
      return false
    }

    if (!zone.departamento) {
      Alert.alert('Departamento invalido', 'Debe ingresar un departamento')
      return false
    }
    if (!zone.trabajadores || zone.trabajadores < 0) {
      Alert.alert('Cantidad de trabajadores invalida', 'Debe ingresar una cantidad valida')
      return false
    }

    if (!zone.latitud) {
      Alert.alert('Latitud invalida', 'Debe ingresar una latitud')
      return false
    }

    if (!zone.longitud) {
      Alert.alert('Longitud invalida', 'Debe ingresar una longitud')
      return false
    }

    return true
  }

  //Creacion o modificacion de un objeto para guardarlo//
  const handleSave = () => {
    setZone(...zone.longitud = longitud);
    setZone(...zone.latitud = latitud);

    if (handleValidate()) {
      dispatch({
        type: zone && zone.id ? "updateZone" : "createZone",
        payload: zone
      })
      // Volver a atras
      navigation.goBack()
    }
  }

  //Guardar el lugar seleccionado//
  const saveLugar = (lugar) => {
    setZone({ ...zone, lugar })
  }

  //Guardar el departamento seleccionado//
  const saveDep = (departamento) => {
    setZone({ ...zone, departamento })
  }

  //Guardar los datos de latitud y longitud cuanso se navega por el mapa//
  const regionChange = (region) => {
    let latitude = parseFloat(region.latitude);
    let longitude = parseFloat(region.longitude);
    setLatitud(latitude.toString());
    setLongitud(longitude.toString());
  }

  return (
    <View style={styles.form}>

      <Text style={{ fontWeight: "bold" }}>Lugar</Text>
      <SelectList
        placeholder='Seleccione un lugar'
        setSelected={(val) => saveLugar(val)}
        data={data}
        save="value"
      />

      <Text style={{ fontWeight: "bold" }}>Departamento</Text>
      <SelectList
        placeholder='Departamento'
        value={zone?.departamento}
        setSelected={(departamento) => saveDep(departamento)}
        data={deps}
        save="value"
      />

      <Text style={{ fontWeight: "bold" }}>Trabajadores</Text>
      <TextInput
        placeholder="Ingrese la cantidad"
        value={zone?.trabajadores}
        onChangeText={(trabajadores) => setZone({ ...zone, trabajadores })}
        style={styles.input}
      />

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
    borderRadius: 5
  },
  map: {
    width: '80%',
    height: '40%',
    marginBottom: 15,
    marginLeft: 30
  }
})

export default RegistrarZona