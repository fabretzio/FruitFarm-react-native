import React from 'react'
import { StyleSheet, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'


const PInicio = ({ navigation }) => {

  const [indicador, setIndicador] = useState(false);

  //Funcion para que luego de cierto tiempo redireccione a un componente//
  const redirect = () => {
    setTimeout(() =>{
      navigation.navigate("Home")
      setIndicador(true);
    },2000);
  }

  //UseEffect para redireccionar
  useEffect(() => {
    redirect();
  }, []);

  if (!indicador){
    //Si el indicador es falso, muestra esto
    return (
      <ImageBackground source={require('../../assets/bienvenidos.png')} resizeMode="cover" style={styles.imgBackground}>
      </ImageBackground>
    )
  }else{
    //Sino muestra esto
    return(
      <ImageBackground source={require('../../assets/bienvenidos.png')} resizeMode="cover" style={styles.imgBackground}>
        <TouchableOpacity
          style={styles.location}
          onPress={() => navigation.navigate("Home")}
        >
          <View style={styles.buttonStyle}>
            <Text style={styles.text}>Volver</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
  
}

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#5856D6',
    width: 100,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  location: {
    position: 'absolute',
    left: 150,
    bottom: 270,
  }
})

export default PInicio