import {Button, View} from "react-native";
import React from "react";
import {StyleSheet} from "react-native";

export const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title={"Game 1"} onPress={()=>navigation.navigate('Game1')}></Button>
                <Button title={"Game 2"} onPress={()=>navigation.navigate('Game2')}></Button>
                <Button title={"About"} onPress={()=>navigation.navigate('Game3')}></Button>
                <Button title={"Settings"} onPress={()=>navigation.navigate('Settings')}></Button>
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
    buttonContainer: {
        justifyContent: 'center',
        width: '80%',
        marginVertical: 16,
    },
});
