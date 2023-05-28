import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Game2 from '../../../components/Game2/Game2';

jest.mock('../../../components/Storage');

jest.useFakeTimers();

jest.mock('expo-sensors', () => ({
    Gyroscope: {
        setUpdateInterval: jest.fn(),
        addListener: jest.fn(),
        removeAllListeners: jest.fn(),
    },
}));

describe('Game2', () => {
    it('wyświetla poprawny początkowy wynik', () => {
        const { getByTestId } = render(<Game2 />);
        const score = getByTestId('Score');
        expect(score.props.children).toContain(0);
    });

    it('rozpoczyna grę po naciśnięciu przycisku Start Game', async () => {
        const { getByText } = render(<Game2 />);
        const startButton = getByText('Start Game');

        fireEvent.press(startButton);

        await waitFor(() => {
            expect(getByText('Timer: 60s')).toBeTruthy();
        });
    });


    it('rozpoczyna grę na nowo po naciśnięciu przycisku Play Again', async () => {
        const { getByText, getByTestId } = render(<Game2 />);
        const startButton = getByText('Start Game');

        fireEvent.press(startButton);

        jest.advanceTimersByTime(60000);

        await waitFor(() => {
            expect(getByText('Game Over')).toBeTruthy();
        });

        const playAgainButton = getByText('Play Again');
        fireEvent.press(playAgainButton);

        await waitFor(() => {
            const score = getByTestId('Score');
            expect(score.props.children).toContain(0);
            expect(getByText('Timer: 60s')).toBeTruthy();
        });
    });
});
