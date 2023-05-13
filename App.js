import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from "./components/HomeScreen";
import {StyleSheet} from "react-native";
import Game1 from "./components/Game1/Game1";
import Game2 from "./components/Game2/Game2";
import Game3 from "./components/Game3/Game3";
import SettingsScreen from "./components/Settings/SettingsScreen";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: 'Welcome'}}
                />
                <Stack.Screen name="Game1" component={Game1} options={{orientation: 'all'}} />
                <Stack.Screen name="Game2" component={Game2}/>
                <Stack.Screen name="Game3" component={Game3}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
