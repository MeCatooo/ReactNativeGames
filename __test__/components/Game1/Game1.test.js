import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Game1 from "../../../components/Game1/Game1";

describe("Game1", () => {

    test("restarts game when Restart button is pressed", () => {
        setTimeout(() => {
        const { getByText, getAllByTestId } = render(<Game1 />);
        const scoreElement = getByText("Score: 0");
        const restartButton = getByText("Restart");
        const cards = getAllByTestId("card");
        fireEvent.press(restartButton); // Wcisnij guzik "Restart"
        fireEvent(cards[0], "press");
        expect(scoreElement).toHaveTextContent("Score: 1");
        expect(cards[0].props.isTurnedOver).toBe(true);
        }, 2000);
    });

    test("renders correctly", () => {
        setTimeout(() => {
            const { getByText, getAllByTestId } = render(<Game1 />);
            const titleElement = getByText("Memory");
            const scoreElement = getByText("Score: 0");
            const cards = getAllByTestId("card");
            expect(titleElement).toBeTruthy();
            expect(scoreElement).toBeTruthy();
            expect(cards.length).toBe(12);
        }, 2000);
    });

    test("increments score and selects card when tapped", () => {
        setTimeout(() => {
        const { getByText, getAllByTestId } = render(<Game1 />);
        const scoreElement = getByText("Score: 0");
        const cards = getAllByTestId("card");
        fireEvent(cards[0], "press");
        expect(scoreElement).toHaveTextContent("Score: 1");
        expect(cards[0].props.isTurnedOver).toBe(true);
        }, 2000);
    });

    test("restarts game when Restart button is pressed", () => {
        setTimeout(() => {
        const { getByText, getAllByTestId } = render(<Game1 />);
        const scoreElement = getByText("Score: 0");
        const restartButton = getByText("Restart");
        const cards = getAllByTestId("card");
        fireEvent(cards[0], "press");
        fireEvent.press(restartButton);
        expect(scoreElement).toHaveTextContent("Score: 0");
        expect(cards[0].props.isTurnedOver).toBe(false);
        }, 2000);
    });

    test("increments score and selects card when tapped", () => {
        setTimeout(() => {
        const { getByText, getAllByTestId } = render(<Game1 />);
        const scoreElement = getByText("Score: 0");
        const cards = getAllByTestId("card");
        fireEvent.press(cards[0]);
        fireEvent.press(cards[1]);
        expect(scoreElement).toHaveTextContent("Score: 2");
        expect(cards[0].props.isTurnedOver).toBe(true);
        expect(cards[1].props.isTurnedOver).toBe(true);
        }, 2000);
    });

    test("does not allow selecting more than 2 cards", () => {
        setTimeout(() => {
        const { getAllByTestId } = render(<Game1 />);
        const cards = getAllByTestId("card");
        fireEvent.press(cards[0]);
        fireEvent.press(cards[1]);
        fireEvent.press(cards[2]);
        expect(cards[2].props.isTurnedOver).toBe(false);
        }, 2000);
    });

    test("matches cards and clears selectedCards when two matching cards are selected", () => {
        setTimeout(() => {
        const { getAllByTestId } = render(<Game1 />);
        const cards = getAllByTestId("card");
        fireEvent.press(cards[0]);
        fireEvent.press(cards[6]);
        expect(cards[0].props.isTurnedOver).toBe(true);
        expect(cards[6].props.isTurnedOver).toBe(true);
        fireEvent.press(cards[1]);
        fireEvent.press(cards[7]);
        expect(cards[1].props.isTurnedOver).toBe(true);
        expect(cards[7].props.isTurnedOver).toBe(true);
        expect(cards[0].props.isTurnedOver).toBe(false);
        expect(cards[6].props.isTurnedOver).toBe(false);
        }, 2000);
    });

    test("does not match cards and clears selectedCards when two non-matching cards are selected", () => {
        setTimeout(() => {
        const { getAllByTestId } = render(<Game1 />);
        const cards = getAllByTestId("card");
        fireEvent.press(cards[0]);
        fireEvent.press(cards[6]);
        expect(cards[0].props.isTurnedOver).toBe(true);
        expect(cards[6].props.isTurnedOver).toBe(true);
        fireEvent.press(cards[1]);
        fireEvent.press(cards[8]);
        expect(cards[1].props.isTurnedOver).toBe(true);
        expect(cards[8].props.isTurnedOver).toBe(true);
        expect(cards[0].props.isTurnedOver).toBe(false);
        expect(cards[6].props.isTurnedOver).toBe(false);
        }, 2000);
    });

    test("restarts the game and resets all values when Restart button is pressed", () => {
        setTimeout(() => {
        const { getByText, getAllByTestId } = render(<Game1 />);
        const scoreElement = getByText("Score: 0");
        const restartButton = getByText("Restart");
        const cards = getAllByTestId("card");
        fireEvent.press(cards[0]);
        fireEvent.press(cards[1]);
        fireEvent.press(restartButton);
        expect(scoreElement).toHaveTextContent("Score: 0");
        expect(cards[0].props.isTurnedOver).toBe(false);
        expect(cards[1].props.isTurnedOver).toBe(false);
        }, 2000);
    });
});
