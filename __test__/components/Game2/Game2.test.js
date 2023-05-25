import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Game2 from '../../../components/Game2/Game2';

describe('Game2', () => {
    test('renders start game button', () => {
        const { getByText } = render(<Game2 />);
        const startButton = getByText('Start Game');
        expect(startButton).toBeTruthy();
    });

    test('starts the game on button press', () => {
        const { getByText, getByTestId } = render(<Game2 />);
        const startButton = getByText('Start Game');
        fireEvent.press(startButton);
        setTimeout(() => {
        const ball = getByTestId('ball');
        const hole = getByTestId('hole');
        expect(ball).toBeTruthy();
        expect(hole).toBeTruthy();
        }, 2000);
    });

    test('renders ball and hole when game starts', () => {
        const { getByText, getByTestId, queryByTestId } = render(<Game2 />);
        const startButton = getByText('Start Game');
        fireEvent.press(startButton);
        setTimeout(() => {
        const ball = getByTestId('ball');
        const hole = getByTestId('hole');
        expect(ball).toBeTruthy();
        expect(hole).toBeTruthy();
        expect(queryByTestId('start-button')).toBeNull();
        }, 2000);
    });

    test('ends the game when timer reaches 0', () => {
        jest.useFakeTimers();
        const { getByText, queryByText } = render(<Game2 />);
        const startButton = getByText('Start Game');
        fireEvent.press(startButton);
        jest.advanceTimersByTime(61000);
        const gameOverText = getByText('Game Over');
        expect(gameOverText).toBeTruthy();
        const playAgainButton = getByText('Play Again');
        expect(playAgainButton).toBeTruthy();
        const startButtonAfterGame = queryByText('Start Game');
        expect(startButtonAfterGame).toBeNull();
    });

    test('saves and loads highest score', () => {
        const { getByText } = render(<Game2 />);
        const startButton = getByText('Start Game');
        fireEvent.press(startButton);
        setTimeout(() => {
            const scoreText = getByText('Score: 5');
            expect(scoreText).toBeTruthy();
            const highestScoreText = getByText('Highest Score: 5');
            expect(highestScoreText).toBeTruthy();
        }, 2000);
    });

    test('renders timer', () => {
        const { getByText } = render(<Game2 />);
        const timerText = getByText('Timer: 60s');
        expect(timerText).toBeTruthy();
    });


});
