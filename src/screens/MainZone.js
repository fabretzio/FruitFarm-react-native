import React, {useContext} from 'react'
import {View, FlatList, Alert, StyleSheet, Text, ImageBackground} from 'react-native'
import ZoneContext from '../provider/ZonesProvider'
import { Icon, ListItem, Button } from 'react-native-elements'

export const MainZone = (props) => {
  const {state, dispatch} = useContext(ZoneContext)
 
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

  const getZoneItem = ({item: zone}) => {
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

  return (
    <ImageBackground source={require('../../assets/backgroundZona.jpg')} resizeMode="cover" style={{
      flex: 1
    }}>
    <View>
          {/* listar los zonas */}
          <FlatList
            keyExtractor={(zona) => zona.id.toString()}
            data={state.Zones}
            renderItem={getZoneItem}
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