import React, {useContext, useState, useEffect} from 'react'
import {View, FlatList, Alert, StyleSheet, ImageBackground, TextInput, Text} from 'react-native'
import SupplyContext from '../provider/SupplyProvider'
import { Icon, ListItem, Button } from 'react-native-elements'

export const MainSupplies = (props) => {
  const {stateS, dispatch} = useContext(SupplyContext)

  //estados para la barra de busqueda y el listado de objetos//
  const [search, setSearch] = useState("");
  const [searchFiltered, setSearchFiltered] = useState([]);
  const [lista, setLista] = useState(stateS.Supplies)

  //Use efect para cargar los datos a mostrar en la lista de observaciones//
  //si la barra de busqueda no tiene valor, carga la lista por defecto//
  //si la barra de busqueda tiene un valor, filtra segun lo indicado//
  useEffect(() => {
    if (search === "") {
      setSearchFiltered(stateS.Supplies);
    } else {
      let searchFiltered = lista.filter((objeto) =>
        objeto.name.includes(search)
      );
      setSearchFiltered(searchFiltered);
    }
  }, [lista, search, stateS.Supplies]);


  //Confirmacion para borrar un objeto//
  const confirmSupplyDeletion = (supply) => {
    Alert.alert('Se esta borrando un insumo', 'Esta seguro?', [
      {
        text: "Si",
        onPress() {
          console.log('Insumo borrado')
          dispatch({
            type: 'deleteSupply',
            payload: supply
          })
        }
      },
      {
        text: "No"
      }
    ])
  }

  //Funciones asociadas para editar o eliminar un objeto//
  const getActions = (supply) => {
    return (
      <>
        <Button 
          onPress={() => props.navigation.navigate("RegistrarInsumo", supply)}
          icon={<Icon name="edit" size={25} color="green" />}
          buttonStyle={styles.buttonStyle}
        />

        <Button 
          onPress={() => confirmSupplyDeletion(supply)}
          icon={<Icon name="delete" size={25} color="red" />}
          buttonStyle={styles.buttonStyle}
        />
      </>
    )
  }

  //Funcion para devolver un item de la lista con los datos requeridos//
  const getSupplyItem = ({item: supply}) => {
    return (
      <ListItem.Swipeable
        key={supply.id}
        rightContent={getActions(supply)}
        rightStyle={styles.buttonContainer}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{supply.name}</ListItem.Title>
          <ListItem.Subtitle>{"Cantidad: " + supply.cantidad}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>

    )
  }

  //Si el estado searchFiltered tiene objetos la pantalla muestra esto//
  if (searchFiltered.length > 0) {
    return (
      <ImageBackground source={require('../../assets/supliesBackground.jpg')} resizeMode="cover" style={{
        flex: 1
      }}> 
        <View style={{ marginHorizontal: 20}}>
          <TextInput
            placeholder="Buscar"
            value={search}
            onChangeText={(name) => setSearch(name)}
            style={styles.input}
          />
          {/* listar insumos */}
          <FlatList
            keyExtractor={(supply) => supply.id.toString()}
            data={searchFiltered}
            renderItem={getSupplyItem}
          />
        </View>
      </ImageBackground>
    )
  }
  else {
    //Sino la pantalla muestra esto//
    return (
      <ImageBackground source={require('../../assets/supliesBackground.jpg')} resizeMode="cover" style={{
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
              <Text>No hay insumos o no existen tales con ese nombre</Text>
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