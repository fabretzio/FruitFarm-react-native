import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Image, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import UserContext from '../provider/UsersProvider';
import * as ImagePicker from 'expo-image-picker';

const RegistrarUsuario = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params ? route.params : {})
  const { dispatch } = useContext(UserContext)


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

    setUser({ ...user, avatar: result.assets[0].uri })
  };

  const handleValidate = () => {

    if (!user.name) {
      Alert.alert('Nombre invalido', 'Debe ingresar un nombre valido')
      return false
    }

    if (!user.apellido) {
      Alert.alert('Apellido invalido', 'Debe ingresar un apellido valido')
      return false
    }
    if (!user.cedula) {
      Alert.alert('Cedula invalida', 'Debe ingresar una cedula valida')
      return false
    }
    // controlar si selecciono un avatar
    if (!user.avatar) {
      Alert.alert('Avatar invalido', 'Debe seleccionar un avatar')
      return false
    }

    return true
  }

  const handleSave = () => {
    if (handleValidate()) {
      dispatch({
        type: user && user.id ? "updateUser" : "createUser",
        payload: user
      })
      // Volver a atras
      navigation.goBack()
    }
  }

  return (
    <ImageBackground source={require('../../assets/backgroundRegisterUser.jpg')} resizeMode="cover" style={{
      flex: 1
    }}>

      <View style={styles.form}>
        <Text style={{fontWeight:"bold"}}>Nombre</Text>
        <TextInput
          placeholder="Nombre"
          value={user?.name}
          onChangeText={(name) => setUser({ ...user, name })}
          style={styles.input}
        />
        <Text style={{fontWeight:"bold"}}>Apellido</Text>
        <TextInput
          placeholder="Apellido"
          value={user?.apellido}
          onChangeText={(apellido) => setUser({ ...user, apellido })}
          style={styles.input}
        />

        <Text style={{fontWeight:"bold"}}>Cedula</Text>
        <TextInput
          placeholder="C.I"
          value={user?.cedula}
          onChangeText={(cedula) => setUser({ ...user, cedula })}
          style={styles.input}
        />

        <Text style={{fontWeight:"bold"}}>Avatar</Text>
        <View style={styles.buttonContainer}>
          <Button title="Imagen" onPress={pickImage} />
        </View>
        <View style={styles.imageContainer}>
          {user && user.avatar && <Image source={{ uri: user.avatar }} style={{ width: 200, height: 200 }} />}
        </View>

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
  },
  buttonContainer: {
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10
  }

})

export default RegistrarUsuario