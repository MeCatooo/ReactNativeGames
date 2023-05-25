import React from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Game3 = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.mainTitle}>About</Text>
            <View>
                <Text style={styles.title}>Gra memory</Text>
                <Text style={styles.paragraph}>Gra polegająca na dobraniu dwóch takich samych kart z jak najmniejszym scorem, stan gry jest zapisywany i można ją kontynuować nawet po wyłączeniu aplikacji. Ilość kart można edytować w Settings.</Text>
                <Text style={styles.title}>Gra kulka</Text>
                <Text style={styles.paragraph}>Gra polegająca na turlaniu kulki za pomocą obracania telefonu aby trafiła do celu jak najwięcej razy w określonym czasie, highest score jest zapisywany na telefonie. Po każdym trafieniu kulka przyśpiesza. Czas gry można zmieniać w Settigns.</Text>
                <Text style={styles.title}>Profil</Text>
                <Text style={styles.paragraph}>Profil użytkownika można otowrzyć używając zdjęcia w prawym górnym rogu ekranu. Miniaturke profilu można zmienić na zdjęcie zrobione aparatem. Można także edytować dane użytkownika.</Text>
            </View>
            <View style={styles.about}>
                <Text>Autorzy:</Text>
                <Text>Adam Turek</Text>
                <Text>Jakub Krupa</Text>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    about: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        padding: 20,
    }
});

export default Game3;