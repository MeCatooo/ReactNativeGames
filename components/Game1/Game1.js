import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {Button, SafeAreaView, ScrollView, StyleSheet, Text} from "react-native";
import Card from "./Card";
import storage from "../Storage";

const cards = [
    "🥹",
    "🗣️",
    "🦷",
    "🍑",
    // "🌪️",
    // "🌎",
    // "👻",
    // "🥶",
    // "🥵",
];

export default function Game1() {
    const [board, setBoard] = React.useState([]);
    const [selectedCards, setSelectedCards] = React.useState([]);
    const [matchedCards, setMatchedCards] = React.useState([]);
    const [score, setScore] = React.useState(0);

    React.useEffect(() => {
        if (selectedCards.length < 2) return;

        if (board[selectedCards[0]] === board[selectedCards[1]]) {
            setMatchedCards([...matchedCards, ...selectedCards]);
            setSelectedCards([]);
            storage.save({
                key: 'matchedCards',
                data: matchedCards,
            });
            console.log(matchedCards)
        } else {
            const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [selectedCards]);

    React.useEffect(() => {
        storage.load({ key: 'score' }).then((score1) => setScore(score1 ?? 0))
        storage.load({ key: 'board' }).then((board1) => {
            setBoard(board1 ?? shuffle([...cards, ...cards]))
        })
        storage.load({ key: 'matchedCards' }).then((matchedCards1) => {
            console.log(matchedCards1)
            setMatchedCards(matchedCards1 ?? [])
        })
    }, []);

    const handleTapCard = (index) => {
        if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
        setSelectedCards([...selectedCards, index]);
        setScore(score + 1);
        storage.save({
            key: 'score',
            data: score,
        });
        };

    const didPlayerWin = () => matchedCards.length === board.length;

    const restartGame = () => {
        setBoard(shuffle([...cards, ...cards]));
        setSelectedCards([]);
        setMatchedCards([]);
        setScore(0);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {didPlayerWin() ? "Congratulations 🎉" : "Memory"}
                <Button title={"Restart"} onPress={restartGame}></Button>
            </Text>
            <Text style={styles.title}>Score: {score}</Text>
            <ScrollView contentContainerStyle={styles.board}>
                {board.map((card, index) => {
                    const isTurnedOver =
                        selectedCards.includes(index) || matchedCards.includes(index);
                    return (
                        <Card
                            key={index}
                            isTurnedOver={isTurnedOver}
                            onPress={() => handleTapCard(index)}
                        >
                            {card}
                        </Card>
                    );
                })}
            </ScrollView>
            <StatusBar style="light" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    board: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    title: {
        fontSize: 32,
        fontWeight: "900",
        color: "snow",
        marginVertical: 15,
    },
});

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        // Swap the elements at i and randomIndex
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    storage.save({
        key: 'board',
        data: array,
    });
    return array;
}