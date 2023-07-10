import React, { useContext, useState, useEffect } from 'react'
import { View, FlatList, Alert, StyleSheet, Text, ImageBackground, TextInput } from 'react-native'
import ZoneContext from '../provider/ZonesProvider'
import { Icon, ListItem, Button } from 'react-native-elements'

export const MainZone = (props) => {
  //Estados con lista de tratamientos//
  const { stateZ, dispatch } = useContext(ZoneContext)

  //estados para la barra de busqueda y el listado de objetos//
  const [search, setSearch] = useState("");
  const [searchFiltered, setSearchFiltered] = useState([]);
  const [lista, setLista] = useState(stateZ.Zones)

  //Use efect para cargar los datos a mostrar en la lista de observaciones//
  //si la barra de busqueda no tiene valor, carga la lista por defecto//
  //si la barra de busqueda tiene un valor, filtra segun lo indicado//
  useEffect(() => {
    if (search === "") {
      setSearchFiltered(stateZ.Zones);
    } else {
      let searchFiltered = lista.filter((objeto) =>
        objeto.lugar.includes(search)
      );
      if (searchFiltered.length === 0){
        searchFiltered = lista.filter((objeto) =>
        objeto.departamento.includes(search))
      }
      setSearchFiltered(searchFiltered);
    }
  }, [lista, search, stateZ.Zones]);

  //Confirmacion para borrar un objeto//
  const confirmZoneDeletion = (zone) => {
    Alert.alert('Se esta borrando una zona', 'Esta seguro?', [
      {
        text: "Si",
        onPress() {
          console.log('zona borrada')
          dispatch({
            type: 'deleteZone',
            payload: zone
          })
        }
      },
      {
        text: "No"
      }
    ])
  }

  //Funciones asociadas para editar o eliminar un objeto//
  const getActions = (zone) => {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("RegistrarZona", zone)}
          icon={<Icon name="edit" size={25} color="green" />}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          onPress={() => confirmZoneDeletion(zone)}
          icon={<Icon name="delete" size={25} color="red" />}
          buttonStyle={styles.buttonStyle}
        />
      </>
    )
  }

  //Funcion para devolver un item de la lista con los datos requeridos//
  const getZoneItem = ({ item: zone }) => {
    return (
      <ListItem.Swipeable
        key={zone.id}
        rightContent={getActions(zone)}
        rightStyle={styles.buttonContainer}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{zone.lugar + " / " + zone.departamento}</ListItem.Title>
          <ListItem.Subtitle>{"Trabajadores: " + zone.trabajadores}</ListItem.Subtitle>
          <Text>Latitud: {zone.latitud}</Text>
          <Text>Longitud: {zone.longitud}</Text>
        </ListItem.Content>
      </ListItem.Swipeable>

    )
  }


  //Si el estado searchFiltered tiene objetos la pantalla muestra esto//
  if (searchFiltered.length > 0) {
    return (
      <ImageBackground source={require('../../assets/backgroundZona.jpg')} resizeMode="cover" style={{
        flex: 1
      }}>
        <View style={{ marginHorizontal: 20}}>
          <TextInput
            placeholder="Buscar por lugar o departamento"
            value={search}
            onChangeText={(name) => setSearch(name)}
            style={styles.input}
          />
          {/* listar los zonas */}
          <FlatList
            keyExtractor={(zona) => zona.id.toString()}
            data={searchFiltered}
            renderItem={getZoneItem}
          />
        </View>
      </ImageBackground>
    )
  }
  else {
    //Sino la pantalla muestra esto//
    return (
      <ImageBackground source={require('../../assets/backgroundZona.jpg')} resizeMode="cover" style={{
        flex: 1
      }}>
        <View style={{ marginHorizontal: 20}}>
          <TextInput
            placeholder="Buscar  por lugar o departamento"
            value={search}
            onChangeText={(name) => setSearch(name)}
            style={styles.input}
          />

          <View style={{ backgroundColor: 'white' }}>
            <Text>No se han ingresado zonas o no hay zonas de este tipo o departamento</Text>
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