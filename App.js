import * as React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./components/HomeScreen";
import { ProfileScreen } from "./components/Profile/ProfileScreen";
import { StyleSheet } from "react-native";
import Game1 from "./components/Game1/Game1";
import Game2 from "./components/Game2/Game2";
import Game3 from "./components/Game3/Game3";
import SettingsScreen from "./components/Settings/SettingsScreen";
import {useState} from "react";
import {getStore} from "./components/Storage";
import {PickImage} from "./components/Profile/pickImage";
import {SplashScreen} from "./components/SplashScreen";


const Stack = createNativeStackNavigator();

export default function App() {

    const [base64Icon, setBase64Icon] = useState(null);

    React.useEffect(() => {
        getStore('profilePic').then(ret => {
            const loadedIcon = ret!=null ? `data:image/png;base64,${ret}` : require('./assets/icon.png');
            setBase64Icon(loadedIcon)
            console.log("loaded icon")
            console.log(base64Icon)
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#273469',
                },
                headerTintColor: '#EBF2FA',
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        {base64Icon && (
                            <Image
                                style={styles.profile}
                                source={typeof base64Icon === 'string' ? { uri: base64Icon } : base64Icon}
                            />
                        )}
                    </TouchableOpacity>
                ),
            })}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{
                    headerBackVisible: false,
                }}
                />
                <Stack.Screen name="Memory" component={Game1} options={{ orientation: 'all' }} />
                <Stack.Screen name="Ball" component={Game2} options={{ orientation: 'portrait' }} />
                <Stack.Screen name="About" component={Game3} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="ProfilePic" component={PickImage} />
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
    profile: {
        width: 40,
        height: 40,
        borderRadius: 50 / 2,
    },
});
