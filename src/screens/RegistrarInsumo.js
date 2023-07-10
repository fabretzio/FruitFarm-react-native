import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements';
import SupplyContext from '../provider/SupplyProvider';

const RegistrarInsumo = ({ route, navigation }) => {

  //Si recive parametros del route, toma los valores de esos parametros, sino crea un objeto nuevo
  const [supply, setSupply] = useState(route.params ? route.params : {})
  const { dispatch } = useContext(SupplyContext)

  //Validacion de datos//
  const handleValidate = () => {

    if (!supply.name) {
      Alert.alert('Nombre invalido', 'Debe ingresar un nombre valido')
      return false
    }

    if (!supply.cantidad || supply.cantidad < 0) {
      Alert.alert('Cantidad invalida', 'Debe ingresar una cantidad correcta')
      return false
    }
    
    return true
  }

  //Funcion para crear o modificar un objeto//
  const handleSave = () => {
    if (handleValidate()) {
      dispatch({
        type: supply && supply.id ? "updateSupply" : "createSupply",
        payload: supply
      })
      // Volver a atras
      navigation.goBack()
    }
  }

  const getCantidad = () => {
    if(supply.cantidad){
      return supply.cantidad.toString();
    }else{
      return ""
    }
  }
  return (
    <ImageBackground source={require('../../assets/backgroundSuplies.jpg')} resizeMode="cover" style={{
      flex: 1
    }}>
    <View style={styles.form}>
      <Text style={{fontWeight:"bold"}}>Nombre del insumo</Text>
      <TextInput
        placeholder="Nombre"
        value={supply?.name}
        onChangeText={(name) => setSupply({ ...supply, name })}
        style={styles.input}
      />

      <Text style={{fontWeight:"bold"}}>Cantidad del insumo</Text>
      <TextInput
        placeholder="Ingrese la cantidad"
        value={getCantidad()}
        onChangeText={(cantidad) => setSupply({ ...supply, cantidad })}
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
    backgroundColor: "white",
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5
  }
})

export default RegistrarInsumo