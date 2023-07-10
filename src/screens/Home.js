import React from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from "react-native";
import PButton from '../components/PButton';

export const Home = ({ navigation }) => {
    return (
        <ImageBackground source={require('../../assets/campo.jpg')} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={{ flex: 1}}>
                    <View style={styles.generalContainer}>
                        <ScrollView>
                            <View style={styles.viewContainer2}>
                                <View style={styles.viewContainerFirstColumn}>

                                     {/*Pantalla home con la lista de botones, que redireccionan a distintos componentes*/}
                                    <PButton
                                        title="Usuarios"
                                        btnColor="#303134"
                                        btnIcon={require('../../assets/usuarios.jpg')}
                                        onPress={() => navigation.navigate("MainUsers")}
                                    />

                                    <PButton
                                        title="Zonas"
                                        btnColor="#303134"
                                        btnIcon={require('../../assets/zonas.png')}
                                        onPress={() => navigation.navigate("MainZone")}
                                    />
                                </View>
                                <View style={styles.viewContainerSecondColumn}>
                                    <PButton
                                        title="Insumos"
                                        btnColor="#303134"
                                        btnIcon={require('../../assets/insumos.jpg')}
                                        onPress={() => navigation.navigate("MainSupplies")}
                                    />

                                    <PButton
                                        title="Observaciones"
                                        btnColor="#303134"
                                        btnIcon={require('../../assets/observaciones.png')}
                                        onPress={() => navigation.navigate("MainOb")}
                                    />
                                </View>
                                <View style={styles.viewContainerThirdColumn}>
                                    <PButton
                                        title="Tratamientos"
                                        btnColor="#303134"
                                        btnIcon={require('../../assets/tratamiento.png')}
                                        onPress={() => navigation.navigate("MainTrat")}
                                    />

                                    <PButton
                                        title="Mapa"
                                        btnColor="#303134"
                                        btnIcon={require('../../assets/mundo.jpg')}
                                        onPress={() => navigation.navigate("Mapa")}
                                    />
                                </View>

                            </View>
                        </ScrollView>
                    </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        justifyContent: "center",
    },
    viewContainer2: {
        flexDirection: "column",
    },
    viewContainerFirstColumn: {
        marginTop: "10%",
        flexDirection: "row",
        height: "50%",
    },
    viewContainerSecondColumn: {
        marginTop: "7%",
        flexDirection: "row",
        height: "50%",
    },
    viewContainerThirdColumn: {
        marginTop: "7%",
        flexDirection: "row",
        height: "50%",
    },
    image: {
        flex: 1,
        height: "100%",
    },
});
