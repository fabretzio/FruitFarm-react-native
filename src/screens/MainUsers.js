import React, { useContext, useState, useEffect } from 'react'
import { View, FlatList, Alert, StyleSheet, ImageBackground, TextInput, Text } from 'react-native'
import UserContext from '../provider/UsersProvider'
import { Avatar, Icon, ListItem, Button } from 'react-native-elements'

export const MainUsers = (props) => {
  //Estados con lista de usuarios//
  const { stateU, dispatch } = useContext(UserContext)

  //estados para la barra de busqueda y el listado de objetos//
  const [search, setSearch] = useState("");
  const [searchFiltered, setSearchFiltered] = useState([]);
  const [lista, setLista] = useState(stateU.Users)

  //Use efect para cargar los datos a mostrar en la lista de observaciones//
  //si la barra de busqueda no tiene valor, carga la lista por defecto//
  //si la barra de busqueda tiene un valor, filtra segun lo indicado//
  useEffect(() => {
    if (search === "") {
      setSearchFiltered(stateU.Users);
      console.log("state", stateU.Users);
    } else {
      let searchFiltered = lista.filter((objeto) =>
              objeto.cedula.toString().includes(search)
      );
      setSearchFiltered(searchFiltered);
    }
  }, [lista, search, stateU.Users]);

  //Confirmacion para borrar un objeto//
  const confirmUserDeletion = (user) => {
    Alert.alert('Se esta borrando un usuario', 'Esta seguro?', [
      {
        text: "Si",
        onPress() {
          console.log('usuario borrado')
          dispatch({
            type: 'deleteUser',
            payload: user
          })
        }
      },
      {
        text: "No"
      }
    ])
  }

  //Funciones asociadas para editar o eliminar un objeto//
  const getActions = (user) => {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("RegistrarUsuario", user)}
          icon={<Icon name="edit" size={25} color="green" />}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          onPress={() => confirmUserDeletion(user)}
          icon={<Icon name="delete" size={25} color="red" />}
          buttonStyle={styles.buttonStyle}
        />
      </>
    )
  }

  //Funcion para devolver un item de la lista con los datos requeridos//
  const getUserItem = ({ item: user }) => {
    return (
      <ListItem.Swipeable
        key={user.id}
        rightContent={getActions(user)}
        rightStyle={styles.buttonContainer}
        bottomDivider
      >
        <Avatar rounded source={{ uri: user.avatar }} />
        <ListItem.Content>
          <ListItem.Title>{user.name + " " + user.apellido}</ListItem.Title>
          <ListItem.Subtitle>{user.cedula}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>

    )
  }

  //Si el estado searchFiltered tiene objetos la pantalla muestra esto//
  if (searchFiltered.length > 0) {
    return (
      <ImageBackground source={require('../../assets/users.jpg')} resizeMode="cover" style={{
        flex: 1
      }}>
        <View style={{ marginHorizontal: 20}}>
          <TextInput
            placeholder="Buscar por cedula"
            value={search}
            onChangeText={(name) => setSearch(name)}
            style={styles.input}
          />
          {/* listar los usuarios */}
        <FlatList
          keyExtractor={(user) => user.id.toString()}
          data={searchFiltered}
          renderItem={getUserItem}
        />
        </View>
      </ImageBackground>
    )
  }
  else {
    //Sino la pantalla muestra esto//
    return (
      <ImageBackground source={require('../../assets/users.jpg')} resizeMode="cover" style={{
        flex: 1
      }}>
        <View style={{ marginHorizontal: 20}}>
          <TextInput
            placeholder="Buscar por cedula"
            value={search}
            onChangeText={(name) => setSearch(name)}
            style={styles.input}
          />
          
          <View style={{backgroundColor: 'white'}}>
              <Text>No hay usuarios o no existe usuario con esa cedula</Text>
          </View>

        </View>
      </ImageBackground>

    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row"
  },
  buttonStyle: {
    minHeight: "100%",
    minWidth: "50%",
    backgroundColor: 'gray'
  },
  input: {
    height: 40,
    backgroundColor: "white",
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    marginTop: 3
  },
})
