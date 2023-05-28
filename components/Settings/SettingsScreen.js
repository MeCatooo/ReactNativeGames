import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import storage from "../Storage";

const SettingsScreen = () => {
        const [selectedNumber, setSelectedNumber] = useState('1');
        const [selectedOption, setSelectedOption] = useState('60');

        React.useEffect(() => {
            loadData()
        }, []);

        const saveData = async () => {
            storage.save({
                key: 'memorySettings',
                data: {
                    number: selectedNumber,
                }
            });
            storage.save({
                key: 'ballSettings',
                data: {
                    option: selectedOption,
                }
            });
        }

        const loadData = async () => {
            const memorySettings = await storage.load({
                key: 'memorySettings',
            });
            const ballSettings = await storage.load({
                key: 'ballSettings',
            });
            setSelectedNumber(memorySettings.number);
            setSelectedOption(ballSettings.option);
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Ustawienia</Text>
                <Text style={styles.label}>Liczba par dla memory:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedNumber}
                    onValueChange={setSelectedNumber}
                >
                    <Picker.Item label="1" value="1"/>
                    <Picker.Item label="2" value="2"/>
                    <Picker.Item label="3" value="3"/>
                    <Picker.Item label="4" value="4"/>
                    <Picker.Item label="5" value="5"/>
                    <Picker.Item label="6" value="6"/>
                    <Picker.Item label="7" value="7"/>
                    <Picker.Item label="8" value="8"/>
                </Picker>

                <Text style={styles.label}>Limit czasu dla kulki:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedOption}
                    onValueChange={setSelectedOption}
                >
                    <Picker.Item label="30" value="30"/>
                    <Picker.Item label="60" value="60"/>
                    <Picker.Item label="120" value="120"/>
                    <Picker.Item label="180" value="180"/>
                </Picker>

                <Text style={styles.warning}>Zmiany będę wprowadzone od nowej gry</Text>

                <Button title={"Save"} onPress={() => {
                    saveData()
                }}/>
            </View>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    picker: {
        width: 200,
        height: 40,
        marginBottom: 20,
    },
    selectedValues: {
        fontSize: 16,
        marginTop: 10,
    },
    warning: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 20,
        color: 'red',
    }
});

export default SettingsScreen;
