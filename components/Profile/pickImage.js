import {StatusBar} from 'expo-status-bar';
import {Button, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {Camera} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {saveStore} from "../Storage";

export const PickImage = ({navigation}) => {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {

        let savePhoto = () => {
            console.log(photo)
            saveStore("profilePic",
                photo.base64
            )
        };

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{uri: "data:image/jpg;base64," + photo.base64}}/>
                {hasMediaLibraryPermission ? <Button title="Set" onPress={savePhoto}/> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)}/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera style={styles.container} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <Button title="Take Pic" onPress={takePic}/>
                    <Button title="Cancel" onPress={() => navigation.navigate('Profile')}/>
                </View>
                <StatusBar style="auto"/>
            </Camera>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    buttonContainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 20,
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});