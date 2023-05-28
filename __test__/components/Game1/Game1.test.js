import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Game1 from '../components/Game1';
import storage from '../components/Storage';

jest.mock('../components/Storage');

it('wyświetla poprawny początkowy wynik', () => {
    const { getByTestId } = render(<Game1 />);
    const score = getByTestId('Score');
    expect(score.props.children).toContain('0');
});

it('odwraca kartę po naciśnięciu', async () => {
    const { getAllByText } = render(<Game1 />);
    const cards = getAllByText('?');

    const card1 = cards[0];
    fireEvent.press(card1);

    await waitFor(() => expect(card1.props.children).not.toBe('?'));
});

it('zapisuje dane do storage po zmianie wyniku lub sparowanych kart', async () => {
    const { getAllByText } = render(<Game1 />);
    const cards = getAllByText('?');

    const card1 = cards[0];
    const card2 = cards[1];

    fireEvent.press(card1);
    fireEvent.press(card2);

    await waitFor(() => expect(storage.save).toHaveBeenCalled());
});

it('rozpoczyna grę na nowo po naciśnięciu przycisku Restart', async () => {
    const { getByText, getByTestId } = render(<Game1 />);
    const restartButton = getByText('Restart');

    fireEvent.press(restartButton);

    await waitFor(() => {
        const score = getByTestId('Score');
        expect(score.props.children).toContain('0');
    });
});
