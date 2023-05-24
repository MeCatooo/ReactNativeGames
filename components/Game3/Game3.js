import React from 'react';
import { View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Game3 = () => {
    return (
        <SafeAreaView>
            <Text>About</Text>
            <View>
                <Text>Autorzy:</Text>
                <Text>Adam Turek</Text>
                <Text>Jakub Krupa</Text>
            </View>
        </SafeAreaView>
    );
};

export default Game3;