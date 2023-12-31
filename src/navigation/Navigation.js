import React from "react";
import { Button, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

//Componentes//
import { Home } from "../screens/Home";
import { MainUsers } from "../screens/MainUsers";
import { MainZone } from "../screens/MainZone";
import { MainSupplies } from "../screens/MainSupplies";
import { MainOb } from "../screens/MainOb";
import { MainTrat } from "../screens/MainTrat";
import Mapa from "../screens/Mapa";
import RegistrarUsuario from "../screens/RegistrarUsuario";
import RegistrarZona from "../screens/RegistrarZona";
import RegistrarInsumo from "../screens/RegistrarInsumo";
import RegistrarObservacion from "../screens/RegistrarObservacion";
import PInicio from "../screens/PInicio";
import RegistrarTratamiento from "../screens/RegistrarTratamiento";


const Navigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pantallas */}

        {/*Pantalla de bienvenida*/}
        <Stack.Screen
          name=" "
          component={PInicio}
          options={{
            headerShown: false
          }}
        />

        {/*Pantalla de inicio*/}   
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Inicio",
            headerStyle: {
              backgroundColor: "#303134",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/*Pantalla con lista de usuarios*/}
        <Stack.Screen
          name="MainUsers"
          component={MainUsers}
          options={({ navigation }) => {
            return {
              title: "Usuarios",
              headerStyle: {
                backgroundColor: "#303134",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("RegistrarUsuario")}
                  type="clear"
                  icon={
                    <Icon name="add" size={25} color="white" />
                  }
                />
              )
            }
          }}
        />

        {/*Pantalla con lista de zonas*/}
        <Stack.Screen
          name="MainZone"
          component={MainZone}
          options={({ navigation }) => {
            return {
              title: "Zonas",
              headerStyle: {
                backgroundColor: "#303134",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("RegistrarZona")}
                  type="clear"
                  icon={
                    <Icon name="add" size={25} color="white" />
                  }
                />
              )
            }
          }}
        />

        {/*Pantalla con lista de insumos*/}
        <Stack.Screen
          name="MainSupplies"
          component={MainSupplies}
          options={({ navigation }) => {
            return {
              title: "Insumos",
              headerStyle: {
                backgroundColor: "#303134",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("RegistrarInsumo")}
                  type="clear"
                  icon={
                    <Icon name="add" size={25} color="white" />
                  }
                />
              )
            }
          }}
        />

        {/*Pantalla con lista de observaciones*/}
        <Stack.Screen
          name="MainOb"
          component={MainOb}
          options={({ navigation }) => {
            return {
              title: "Observaciones",
              headerStyle: {
                backgroundColor: "#303134",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("RegistrarObservacion")}
                  type="clear"
                  icon={
                    <Icon name="add" size={25} color="white" />
                  }
                />
              )
            }
          }}
        />

        {/*Pantalla con lista de tratamientos*/}
        <Stack.Screen
          name="MainTrat"
          component={MainTrat}
          options={({ navigation }) => {
            return {
              title: "Tratamientos",
              headerStyle: {
                backgroundColor: "#303134",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("RegistrarTratamiento")}
                  type="clear"
                  icon={
                    <Icon name="add" size={25} color="white" />
                  }
                />
              )
            }
          }}
        />

        {/*Pantalla del mapa con tratamientos*/}
        <Stack.Screen
          name="Mapa"
          component={Mapa}
          options={{
            title: "Mapa de tratamientos",
            headerStyle: {
              backgroundColor: "#303134",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
        {/*Pantalla para el registro de usuarios*/}
        <Stack.Screen
          name="RegistrarUsuario"
          component={RegistrarUsuario}
          options={{
            title: "Registro de usuario",
            headerStyle: {
              backgroundColor: "#303134",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/*Pantalla para el registro de zonas*/}
        <Stack.Screen
          name="RegistrarZona"
          component={RegistrarZona}
          options={{
            title: "Registro de zonas",
            headerStyle: {
              backgroundColor: "#303134",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/*Pantalla para el registro de insumos*/}
        <Stack.Screen
          name="RegistrarInsumo"
          component={RegistrarInsumo}
          options={{
            title: "Registro de insumos",
            headerStyle: {
              backgroundColor: "#303134",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/*Pantalla para el registro de observaciones*/}
        <Stack.Screen
          name="RegistrarObservacion"
          component={RegistrarObservacion}
          options={{
            title: "Registro de observaciones",
            headerStyle: {
              backgroundColor: "#303134",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/*Pantalla para el registro de tratamientos*/}
        <Stack.Screen
          name="RegistrarTratamiento"
          component={RegistrarTratamiento}
          options={{
            title: "Registro de tratamientos",
            headerStyle: {
              backgroundColor: "#303134",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;