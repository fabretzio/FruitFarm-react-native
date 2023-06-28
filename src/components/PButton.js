import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'


const PButton = ({
    title = 'First Button',
    btnColor = 'red',
    btnIcon = 'star',
    txtColor = 'white',
    onPress = () => console.log('click') }
) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: btnColor }]} onPress={onPress}>
            <ImageBackground source={btnIcon} resizeMode="cover" style={styles.image}>
                <View style={styles.container}>
                    <Text style={[styles.text, {color: txtColor}]}>{title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>

    )
}

export default PButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flex: 1,
        color: 'white',
        padding: 2,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 25,
        borderRadius: 5,
    },
    text: {
        fontSize: 17,
    },
    image: {
        flex: 1,
        paddingBottom: 5,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
})
