import React from 'react'
import { View, FlatList, ImageBackground, StyleSheet, Alert } from 'react-native'
import { Icon, ListItem, Button } from 'react-native-elements'
import TratamientosContext from '../provider/TratamientoProvider'


export const MainTrat = () => {
  const { state, dispatch } = useContext(TratamientosContext)

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
          <ListItem.Title>{tratamiento.name + " " + tratamiento.zone}</ListItem.Title>
          <ListItem.Subtitle>{tratamiento.user + " " + tratamiento.fecha}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    )
  }

  return (
    <ImageBackground source={require('../../assets/backgroundTrats.jpg')} resizeMode="cover" style={{
      flex: 1
    }}> 
    <View>
        {/* lista de los tratamientos */}
        <FlatList
          keyExtractor={(tratamiento) => tratamiento.id.toString()}
          data={state.Tratamientos}
          renderItem={getTratamientoItem}
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
