import { View, FlatList, ImageBackground, StyleSheet, Alert, TextInput, Text } from 'react-native'
import { Icon, ListItem, Button } from 'react-native-elements'
import TratamientosContext from '../provider/TratamientoProvider'
import { React, useContext, useState, useEffect } from 'react'
import UserContext from '../provider/UsersProvider';

export const MainTrat = (props) => {

  //Estados con lista de tratamientos y lista de usuarios//
  const { stateT, dispatch } = useContext(TratamientosContext)
  const { stateU } = useContext(UserContext);

  //estados para la barra de busqueda y el listado de objetos//
  const [search, setSearch] = useState("");
  const [searchFiltered, setSearchFiltered] = useState([]);
  const [lista, setLista] = useState(stateT.Tratamientos);

  //Use efect para cargar los datos a mostrar en la lista de observaciones//
  //si la barra de busqueda no tiene valor, carga la lista por defecto//
  //si la barra de busqueda tiene un valor, filtra segun lo indicado//
  useEffect(() => {
    if (search === "") {
      setSearchFiltered(stateT.Tratamientos);
    } else {
      let searchFiltered = lista.filter((objeto) =>
        objeto.name.includes(search)
      );
      setSearchFiltered(searchFiltered);
    }
  }, [lista, search, stateT.Tratamientos]);

  //Confirmacion para borrar un objeto//
  const confirmTratamientoDeletion = (tratamiento) => {
    Alert.alert('Se esta borrando un tratamiento', 'Esta seguro?', [
      {
        text: "Si",
        onPress() {
          console.log('tratamiento borrado')
          dispatch({
            type: 'deleteTratamiento',
            payload: tratamiento
          })
        }
      },
      {
        text: "No"
      }
    ])
  }

  //Recorrer el estado con lista de usuarios para tomar nombre y apellido//
  const getUser = (id) => {
    for (let index = 0; index < stateU.Users.length; index++) {
      if (stateU.Users[index].id == id) {
        return stateU.Users[index].name + " " + stateU.Users[index].apellido
      }
    }
  }

  //Recorrer lista de tratamientos para ver si tienen observaciones//
  const observaciones = (id) => {
    for (let index = 0; index < stateT.Tratamientos.length; index++) {
      if (stateT.Tratamientos[index].id == id) {
        if(stateT.Tratamientos[index].observaciones.length>0)
        return "Si, tiene observaciones"
        else
        return "No tiene observaciones"
      }
    }
  }

  //Funciones asociadas para editar o eliminar un objeto//
  const getActions = (tratamiento) => {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("RegistrarTratamiento", tratamiento)}
          icon={<Icon name="edit" size={25} color="green" />}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          onPress={() => confirmTratamientoDeletion(tratamiento)}
          icon={<Icon name="delete" size={25} color="red" />}
          buttonStyle={styles.buttonStyle}
        />
      </>
    )
  }

  // Crear cada item de tratamiento para agregarlo a la lista //
  const getTratamientoItem = ({ item: tratamiento }) => {

    return (
      <ListItem.Swipeable
        key={tratamiento.id}
        rightContent={getActions(tratamiento)}
        rightStyle={styles.buttonContainer}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{getUser(tratamiento.user)}</ListItem.Title>
          <ListItem.Subtitle>{"T-" + tratamiento.id}</ListItem.Subtitle>
          <Text>{tratamiento.inicio + " / " + tratamiento.fin}</Text>
          <Text>{observaciones(tratamiento.id)}</Text>
        </ListItem.Content>
      </ListItem.Swipeable>
    )
  }

  //Si el estado searchFiltered tiene objetos la pantalla muestra esto//
  if (searchFiltered.length > 0) {
    return (
      <ImageBackground source={require('../../assets/backgroundTrats.jpg')} resizeMode="cover" style={{
        flex: 1
      }}>
        <View style={{ marginHorizontal: 20}}>
          <TextInput
            placeholder="Buscar por nombre"
            value={search}
            onChangeText={(name) => setSearch(name)}
            style={styles.input}
          />
          {/* lista de los tratamientos */}
        <FlatList
          keyExtractor={(tratamiento) => tratamiento.id.toString()}
          data={searchFiltered}
          renderItem={getTratamientoItem}
        />
        </View>
      </ImageBackground>
    )
  }
  else {
    //Sino la pantalla muestra esto//
    return (
      <ImageBackground source={require('../../assets/backgroundTrats.jpg')} resizeMode="cover" style={{
        flex: 1
      }}>
        <View style={{ marginHorizontal: 20}}>
          <TextInput
            placeholder="Buscar por nombre"
            value={search}
            onChangeText={(name) => setSearch(name)}
            style={styles.input}
          />

          <View style={{ backgroundColor: 'white' }}>
            <Text>No se han ingresado tratamientos o no existe éste tratamiento.</Text>
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
