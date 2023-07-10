import * as React from 'react'
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from 'react-native';
import TratamientosContext from '../provider/TratamientoProvider';
import ZoneContext from '../provider/ZonesProvider';

const Mapa = () => {

  //Estados de tratamientos y zonas//
  const { stateT } = React.useContext(TratamientosContext);
  const { stateZ } = React.useContext(ZoneContext);

  //Seteo de estados en variables//
  const [Trats, setTrats] = React.useState(stateT.Tratamientos)
  const [Zons, setZons] = React.useState(stateZ.Zones)
  const [listaTratamientos, setListaTratamientos] = React.useState([]);

  //UseEffect para crear una lista nueva con todos los tratamientos ingresados//
  React.useEffect(() => {

    const listarTratamientos = () => {

      const lista = [];
      for (let y = 0; y < Trats.length; y++) {
        for (let o = 0; o < Zons.length; o++) {
          if (Zons[o].id == Trats[y].zone) {
            let tratamiento = { name: Trats[y].name , lugar:  Zons[o].lugar, depto: Zons[o].departamento, latitude: Zons[o].latitud, longitude: Zons[o].longitud }
            lista.push(tratamiento);
          }
        }
        setListaTratamientos(lista);
      }
    }
    listarTratamientos();
  }, [])






  return (
    /*Mapa que mostrara los tratamientos*/
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -34.185221367760356,
        longitude: -57.56412115987714,
        latitudeDelta: 1.1518808693069502,
        longitudeDelta: 1.4355648175064175,
      }}
    >
      {listaTratamientos.map((marker, index) => (
        //Se recorre la lista con los tratamientos y crea marcadores de los mismos//
        <Marker
          key={index}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.name}
          description={marker.lugar + " " + marker.depto}
        />
      ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
})

export default Mapa