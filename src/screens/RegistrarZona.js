import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list';
import { Button } from 'react-native-elements';
import ZoneContext from '../provider/ZonesProvider';
import MapView from 'react-native-maps';

const RegistrarZona = ({ route, navigation }) => {

  const [zone, setZone] = useState(route.params ? route.params : {})
  const { dispatch } = useContext(ZoneContext)
  const [latitud, setLatitud] = useState();
  const [longitud, setLongitud] = useState();
  const data = [
    { key: '1', value: 'Estancia' },
    { key: '2', value: 'Quinta' },
    { key: '3', value: 'Estacion' }
  ];

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

  const handleSave = () => {
    setZone( ...zone.longitud = longitud);
    setZone( ...zone.latitud = latitud);

    if (handleValidate()) {
      dispatch({
        type: zone && zone.id ? "updateZone" : "createZone",
        payload: zone
      })
      // Volver a atras
      navigation.goBack()
    }
  }

  const saveLugar = (lugar) => {
    setZone({ ...zone, lugar })
  }

  const regionChange = (region) => {
    let latitude = parseFloat(region.latitude);
    let longitude = parseFloat(region.longitude);

    setLatitud(latitude.toString());
    setLongitud(longitude.toString());
  }

  return (
    <View style={styles.form}>
      
      <SelectList
        placeholder='Seleccione un lugar'
        setSelected={(val) => saveLugar(val)}
        data={data}
        save="value"
      />

      <Text style={{fontWeight:"bold"}}>Departamento</Text>
      <TextInput
        placeholder="Departamento"
        value={zone?.departamento}
        onChangeText={(departamento) => setZone({ ...zone, departamento })}
        style={styles.input}
      />

      <Text style={{fontWeight:"bold"}}>Trabajadores</Text>
      <TextInput
        placeholder="Ingrese la cantidad"
        value={zone?.trabajadores}
        onChangeText={(trabajadores) => setZone({ ...zone, trabajadores })}
        style={styles.input}
      />

      <Text style={{fontWeight:"bold"}}>Latitud</Text>
      <TextInput
        placeholder="Ingrese latitud"
        value={latitud}
        editable={false}
        style={styles.input}
      />

      <Text style={{fontWeight:"bold"}}>Longitud</Text>
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