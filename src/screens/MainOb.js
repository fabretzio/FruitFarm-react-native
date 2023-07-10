import React, { useContext, useState, useEffect } from 'react'
import { View, FlatList, Alert, StyleSheet, Text, Image, ImageBackground, TextInput } from 'react-native'
import ObservationContext from '../provider/ObservacionProvider';
import { Icon, ListItem, Button } from 'react-native-elements'

export const MainOb = (props) => {
  const { stateO, dispatch } = useContext(ObservationContext)

  //estados para la barra de busqueda y el listado de objetos//
  const [search, setSearch] = useState("");
  const [searchFiltered, setSearchFiltered] = useState([]);
  const [lista, setLista] = useState(stateO.Observations)

  //Use efect para cargar los datos a mostrar en la lista de observaciones//
  //si la barra de busqueda no tiene valor, carga la lista por defecto//
  //si la barra de busqueda tiene un valor, filtra segun lo indicado//
  useEffect(() => {
    if (search === "") {
      setSearchFiltered(stateO.Observations);
    } else {
      let searchFiltered = lista.filter((objeto) =>
        objeto.titulo.includes(search)
      );
      setSearchFiltered(searchFiltered);
    }
  }, [lista, search, stateO.Observations]);

  //Confirmacion para borrar un objeto//
  const confirmObservationDeletion = (observation) => {
    Alert.alert('Se esta borrando un observacion', 'Esta seguro?', [
      {
        text: "Si",
        onPress() {
          console.log('Observacion borrada')
          dispatch({
            type: 'deleteObservation',
            payload: observation
          })
        }
      },
      {
        text: "No"
      }
    ])
  }

  //Funciones asociadas para editar o eliminar un objeto//
  const getActions = (observation) => {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("RegistrarObservacion", observation)}
          icon={<Icon name="edit" size={25} color="green" />}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          onPress={() => confirmObservationDeletion(observation)}
          icon={<Icon name="delete" size={25} color="red" />}
          buttonStyle={styles.buttonStyle}
        />
      </>
    )
  }

  //Funcion para devolver un item de la lista con los datos requeridos//
  const getObservationItem = ({ item: observation }) => {
    return (
      <ListItem.Swipeable
        key={observation.id}
        rightContent={getActions(observation)}
        rightStyle={styles.buttonContainer}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{observation.titulo} <View style={styles.imageContainer}>
            {observation && observation.foto && <Image source={{ uri: observation.foto }} style={{ width: 100, height: 100 }} />}
          </View></ListItem.Title>
          <ListItem.Subtitle>{"Latitud: " + observation.latitud}</ListItem.Subtitle>
          <Text>Longitud: {observation.longitud}</Text>

        </ListItem.Content>
      </ListItem.Swipeable>
    )
  }

  //Si el estado searchFiltered tiene objetos la pantalla muestra esto//
  if (searchFiltered.length > 0) {
    return (
      <ImageBackground source={require('../../assets/backgroundOb.jpg')} resizeMode="cover" style={{
        flex: 1
      }}>
        <View style={{ marginHorizontal: 20}}>
          <TextInput
            placeholder="Buscar"
            value={search}
            onChangeText={(name) => setSearch(name)}
            style={styles.input}
          />
          {/* listar observaciones */}
            <FlatList
              keyExtractor={(observation) => observation.id.toString()}
              data={searchFiltered}
              renderItem={getObservationItem}
            />      
        </View>
      </ImageBackground>
    )
  }
  else {
    //Sino la pantalla muestra esto//
    return (
      <ImageBackground source={require('../../assets/backgroundOb.jpg')} resizeMode="cover" style={{
        flex: 1
      }}>
        <View style={{ marginHorizontal: 20}}>
          <TextInput
            placeholder="Buscar"
            value={search}
            onChangeText={(name) => setSearch(name)}
            style={styles.input}
          />
          
          <View>
              <Text>No hay observaciones o no existen tales con ese nombre</Text>
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15
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
