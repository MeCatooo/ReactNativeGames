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
    "🌪️",
    "🌎",
    "👻",
    "🥶",
    "🥵",
].slice(0, 3); // place for variable from settings



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
        } else {
            const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [selectedCards]);

    React.useEffect(() => { loadData()}, []);

    React.useEffect(() => { 
        if(board.length !== 0) {
            saveData();
        }
    }, [score, matchedCards]);

    const handleTapCard = (index) => {
        if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
        setSelectedCards([...selectedCards, index]);
        setScore(score + 1);
        };

    const didPlayerWin = () => matchedCards.length === board.length;

    const restartGame = () => {
        setBoard(shuffle([...cards, ...cards]));
        setSelectedCards([]);
        setMatchedCards([]);
        setScore(0);
    }

    const saveData = async () => {
        console.log("saveData");
        storage.save({
            key: 'score',
            data: score,
        });
        console.log("Board");
        console.log(board);
        storage.save({
            key: 'board',
            data: board,
        });
        console.log("matchedCards");
        console.log(matchedCards);
        storage.save({
            key: 'matchedCards',
            data: matchedCards,
        });
    };

    const loadData = async () => {
        console.log("loadData");
        storage.load({ key: 'score' }).then((score1) => setScore(score1 ?? 0))
        storage.load({ key: 'board' }).then((board1) => {
            setBoard(board1 ?? shuffle([...cards, ...cards]))
        })
        storage.load({ key: 'matchedCards' }).then((matchedCards1) => {
            setMatchedCards(matchedCards1 ?? [])
        })
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {didPlayerWin() ? "Congratulations 🎉" : "Memory"}
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
            <Button title={"Restart"} onPress={restartGame}></Button>
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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}