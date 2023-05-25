import { Image, View, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export const HomeScreen = ({ navigation }) => {

    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
            }),
        [navigation]
    );

    return (
        <View style={styles.container}>
            <View style={styles.buttonGrid}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Memory')}
                >
                    <Text style={styles.buttonText}>Memory game</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Ball')}
                >
                    <Text style={styles.buttonText}>Ball game</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('About')}
                >
                    <Text style={styles.buttonText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGrid: {
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    button: {
        width: '48%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        marginBottom: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
