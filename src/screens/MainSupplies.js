import React, {useContext} from 'react'
import {View, FlatList, Alert, StyleSheet, ImageBackground} from 'react-native'
import SupplyContext from '../provider/SupplyProvider'
import { Icon, ListItem, Button } from 'react-native-elements'

export const MainSupplies = (props) => {
  const {state, dispatch} = useContext(SupplyContext)

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

  return (
    <ImageBackground source={require('../../assets/supliesBackground.jpg')} resizeMode="cover" style={{
      flex: 1
    }}> 
    <View>
          {/* listar insumos */}
          <FlatList
            keyExtractor={(supply) => supply.id.toString()}
            data={state.Supplies}
            renderItem={getSupplyItem}
          />
       </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row"
  },
  buttonStyle: {
    minHeight: "100%",
    minWidth: "50%",
    backgroundColor: 'gray'
  }
})