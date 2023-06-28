import React, { useContext } from 'react'
import { View, FlatList, Alert, StyleSheet, Text, Image, ImageBackground } from 'react-native'
import ObservationContext from '../provider/ObservacionProvider';
import { Icon, ListItem, Button } from 'react-native-elements'

export const MainOb = (props) => {
  const { state, dispatch } = useContext(ObservationContext)

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

  const getObservationItem = ({ item: observation }) => {
    return (
      <ListItem.Swipeable
        key={observation.id}
        rightContent={getActions(observation)}
        rightStyle={styles.buttonContainer}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{observation.title}</ListItem.Title>
          <View style={styles.imageContainer}>
            {observation && observation.foto && <Image source={{ uri: observation.foto }} style={{ width: 200, height: 200 }} />}
          </View>
          <ListItem.Subtitle>{"Latitud: " + observation.latitud}</ListItem.Subtitle>
          <Text>Longitud: {observation.longitud}</Text>
        </ListItem.Content>
      </ListItem.Swipeable>

    )
  }

  return (
    <ImageBackground source={require('../../assets/backgroundOb.jpg')} resizeMode="cover" style={{
      flex: 1
    }}>
      <View>
        {/* listar observaciones */}
        <FlatList
          keyExtractor={(observation) => observation.id.toString()}
          data={state.Observations}
          renderItem={getObservationItem}
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
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10
  }
})
