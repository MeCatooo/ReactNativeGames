import * as React from "react";
import {Pressable, StyleSheet, Text} from "react-native";

export default function Card({onPress, isTurnedOver, children, testID}) {
    return (
        <Pressable
            style={isTurnedOver ? styles.cardUp : styles.cardDown}
            onPress={onPress}
            testID={testID}
        >
            {isTurnedOver ? (
                <Text style={styles.text}>{children}</Text>
            ) : (
                <Text style={styles.text}>?</Text>
            )}
        </Pressable>
    );
}


const styles = StyleSheet.create({
    cardUp: {
        width: 100,
        height: 100,
        margin: 10,
        borderColor: "#334155",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1e293b",
    },
    cardDown: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 10,
        borderColor: "#334155",
        backgroundColor: "#1e293b",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 46,
        color: "#334155",
    },
});