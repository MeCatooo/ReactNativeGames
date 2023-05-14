import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function Game2() {
    const [gyroData, setGyroData] = useState({});
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0, vx: 0, vy: 0 });
    const [holePosition, setHolePosition] = useState({ x: 0, y: 0 });
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        // Gyroscope.setUpdateInterval(16);
        Gyroscope.addListener(gyroData => {
            setGyroData(gyroData);
        });
        return () => {
            Gyroscope.removeAllListeners();
        };
    }, []);

    //to do: add score and save score to database
    useEffect(() => {
        if (gameStarted && !gameOver) {
            const { width, height } = Dimensions.get('window');
            const { x: ballX, y: ballY, vx, vy } = ballPosition;
            const { x: holeX, y: holeY } = holePosition;
            const dt = 1 / 60; // delta time
            const ax = gyroData.y * 1000; // acceleration along x axis
            const ay = gyroData.x * -1000; // acceleration along y axis
            const newVx = vx + ax * dt; // new velocity along x axis
            const newVy = vy + ay * dt; // new velocity along y axis
            const newX = Math.max(0, Math.min(width, ballX + newVx * dt)); // new position along x axis
            const newY = Math.max(0, Math.min(height, ballY + newVy * dt)); // new position along y axis

            if (newX === 0 || newX === width) {
                setBallPosition({ x: ballX, y: newY, vx: -newVx * 0.7, vy: newVy * 0.7 }); // reflect velocity
            } else if (newY === 0 || newY === height) {
                setBallPosition({ x: newX, y: ballY, vx: newVx * 0.7, vy: -newVy * 0.7 }); // reflect velocity
            } else {
                setBallPosition({ x: newX, y: newY, vx: newVx, vy: newVy });
            }




            if (Math.abs(ballX - holeX) < 30 && Math.abs(ballY - holeY) < 30) {
                setGameOver(true);
                alert('Congratulations! You won!');
            }
        }
    }, [gyroData]);

    const startGame = () => {
        const { width, height } = Dimensions.get('window');
        const holeX = Math.floor(Math.random() * (width - 60)) + 30;
        const holeY = Math.floor(Math.random() * (height - 60)) + 30;
        setHolePosition({ x: holeX, y: holeY });
        setGameStarted(true);
    };

    return (
        <View style={styles.container}>
            {!gameStarted && (
                <Text style={styles.startButton} onPress={startGame}>
                    Start Game
                </Text>
            )}
            {gameOver && (
                <Text style={styles.startButton} onPress={() => setGameOver(false)}>
                    Play Again
                </Text>
            )}
            <View style={[styles.ball, { left: ballPosition.x, top: ballPosition.y }]} />
            <View style={[styles.hole, { left: holePosition.x, top: holePosition.y }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ball: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'blue',
    },
    hole: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: 'black',
    },
    startButton: {
        fontSize: 24,
        color: 'blue',
        marginBottom: 20,
    },
});
