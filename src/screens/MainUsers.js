import React, { useContext } from 'react'
import { View, FlatList, Alert, StyleSheet, ImageBackground } from 'react-native'
import UserContext from '../provider/UsersProvider'
import { Avatar, Icon, ListItem, Button } from 'react-native-elements'

export const MainUsers = (props) => {
  const { state, dispatch } = useContext(UserContext)

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

  return (
    <ImageBackground source={require('../../assets/users.jpg')} resizeMode="cover" style={{
      flex: 1
    }}>
      <View>
        {/* listar los usuarios */}
        <FlatList
          keyExtractor={(user) => user.id.toString()}
          data={state.Users}
          renderItem={getUserItem}
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
