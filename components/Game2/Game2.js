import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Gyroscope} from 'expo-sensors';
import storage from "../Storage";

export default function Game2() {
    const [gyroData, setGyroData] = useState({});
    const [ballPosition, setBallPosition] = useState({x: 0, y: 0, vx: 0, vy: 0});
    const [holePosition, setHolePosition] = useState({x: 0, y: 0});
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [timer, setTimer] = useState(60);
    const [timerSettings, setTimerSettings] = useState(60);

    useEffect(() => {
        Gyroscope.setUpdateInterval(16);
        Gyroscope.addListener(gyroData => {
            setGyroData(gyroData);
        });
        return () => {
            Gyroscope.removeAllListeners();
        };
    }, []);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            let {width, height} = Dimensions.get('window');
            width = width * 0.9;
            height = height * 0.9;
            const {x: ballX, y: ballY, vx, vy} = ballPosition;
            const {x: holeX, y: holeY} = holePosition;
            const dt = 1 / 60;
            const ax = gyroData.y * 1000;
            const ay = gyroData.x * 1000;
            let newVx = vx + ax * dt;
            let newVy = vy + ay * dt;
            const newX = Math.max(0, Math.min(width, ballX + newVx * dt));
            const newY = Math.max(0, Math.min(height, ballY + newVy * dt));

            if (newX === 0 || newX === width) {
                newVx = -newVx * 0.7;
            } else if (newY === 0 || newY === height) {
                newVy = -newVy * 0.7;
            }

            setBallPosition({x: newX, y: newY, vx: newVx, vy: newVy});

            if (
                Math.abs(ballX - holeX) < 30 &&
                Math.abs(ballY - holeY) < 30 &&
                holeX > 0 &&
                holeX < width &&
                holeY > 0 &&
                holeY < height
            ) {
                setScore(prevScore => prevScore + 1);
                setHolePosition(generateRandomHolePosition(width, height));
                setBallPosition({x: width / 2, y: height / 2, vx: newVx * 1.1, vy: newVy * 1.1});
            }

            if (timer <= 0) {
                setGameOver(true);
            }
        }
    }, [gyroData, timer]);

    const startGame = () => {
        const {width, height} = Dimensions.get('window');
        setBallPosition({x: width / 2, y: height / 2, vx: 0, vy: 0});
        setHolePosition(generateRandomHolePosition(width, height));
        setScore(0);
        setTimer(timerSettings);
        setGameStarted(true);
        setGameOver(false);
    };

    const generateRandomHolePosition = (width, height) => {
        const holeSize = 60;
        const holeX = Math.floor(Math.random() * (width - holeSize)) + holeSize;
        const holeY = Math.floor(Math.random() * (height - holeSize)) + holeSize;
        return {x: holeX, y: holeY};
    };

    const updateScore = (newScore) => {
        setScore(newScore);
    };


    useEffect(() => {
        if (score > highestScore) {
            setHighestScore(score);
            saveData().then();
        }
    }, [score]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            const timerId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [gameStarted, gameOver]);

    useEffect(() => {
        loadData().then();
    }, []);

    const loadData = async () => {
        try {
            storage.load({
                key: 'highestScore',
            }).then(ret => {
                setHighestScore(ret);
            }).catch(() => {
            })

            storage.load({
                key: 'ballSettings',
            }).then(ret => {
                setTimerSettings(ret.option)
            }).catch(() => {
            })
        } catch {

        }
    }

    const saveData = async () => {
        console.log(highestScore)
        storage.save({
            key: 'highestScore',
            data: highestScore,
        }).then();
    }

    return (
        <View style={styles.container}>
            <Text testID="Score" style={styles.score}>Score: {score}</Text>
            <Text style={styles.timer}>Timer: {timer}s</Text>
            {!gameStarted && !gameOver && (
                <Text style={styles.startButton} onPress={startGame}>
                    Start Game
                </Text>
            )}
            {gameOver && (
                <>
                    <Text style={styles.gameOverText}>Game Over</Text>
                    <Text style={styles.summaryText}>Highest Score: {highestScore}</Text>
                    <Text style={styles.startButton} onPress={startGame}>
                        Play Again
                    </Text>
                </>
            )}
            {gameStarted && (
                <>
                    <View style={[styles.ball, {left: ballPosition.x, top: ballPosition.y}]}/>
                    <View style={[styles.hole, {left: holePosition.x, top: holePosition.y}]}/>
                </>
            )}
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
    score: {
        position: 'absolute',
        top: 20,
        right: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    timer: {
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: 24,
        fontWeight: 'bold',
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
    gameOverText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    summaryText: {
        fontSize: 24,
        marginBottom: 20,
    },
});
