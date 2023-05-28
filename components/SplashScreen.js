import {StyleSheet, Text, View} from "react-native";
import React from "react";

export const SplashScreen = ({navigation}) => {

    React.useEffect(() => {
        setTimeout(() => navigation.navigate('Home'), 1000);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loading...</Text>
            <View style={styles.about}>
                <Text>Autorzy:</Text>
                <Text>Adam Turek</Text>
                <Text>Jakub Krupa</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    about: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }

});
