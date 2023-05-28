import {Button, Image, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import storage, {clearStore, getStore} from "../Storage";

export const ProfileScreen = ({navigation}) => {
    const [base64Icon, setBase64Icon] = useState(null);
    const [text, onChangeText] = React.useState('No username set');

    React.useEffect(() => {
        getStore('profilePic').then(ret => {
            const loadedIcon = ret != null ? `data:image/png;base64,${ret}` : require('../../assets/icon.png');
            setBase64Icon(loadedIcon);
        });
    }, []);

    React.useEffect(() => {
        loadData().catch(() => {
        });
    }, []);

    const loadData = async () => {
        storage.load({
            key: 'username',
        }).then(ret => {
            onChangeText(ret);
        })
    }

    const saveData = async () => {
        console.log(text);
        storage.save({
            key: 'username',
            data: text,
        }).catch(() => {
        });
    }

    const handleUsernameChange = (text) => {
        console.log(text);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.preview} source={typeof base64Icon === 'string' ? {uri: base64Icon} : base64Icon}/>
            <View style={styles.buttonContainer}>
                <Button title="Set" onPress={() => navigation.navigate('ProfilePic')}/>
                <Button title={"Reset"} onPress={() => {
                    clearStore('profilePic');
                }}/>
            </View>
            <Text style={styles.warning}>Uwaga! Po zmianie ikony należy zresetować aplikację</Text>
            <View style={styles.details}>
                <Text>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <Button title={"Save"} onPress={() => {
                    saveData();
                }}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 30,
    },
    preview: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    details: {
        marginTop: 30,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        borderRadius: 5,
    },
    warning: {
        color: 'red',
        marginTop: 10,
    }
});
