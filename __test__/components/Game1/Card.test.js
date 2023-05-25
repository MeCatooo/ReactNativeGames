import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Card from "../../../components/Game1/Card";

describe("Card", () => {
    test("renders correctly when turned over", () => {
        const { getByText } = render(
            <Card isTurnedOver={true} onPress={() => {}}>
                A
            </Card>
        );
        const textElement = getByText("A");
        expect(textElement).toBeTruthy();
    });

    test("renders correctly when not turned over", () => {
        const { getByText } = render(
            <Card isTurnedOver={false} onPress={() => {}}>
                A
            </Card>
        );
        const textElement = getByText("?");
        expect(textElement).toBeTruthy();
    });

    test("calls onPress function when pressed", () => {
        const onPressMock = jest.fn();
        const { getByText } = render(
            <Card isTurnedOver={true} onPress={onPressMock}>
                A
            </Card>
        );
        const cardElement = getByText("A");
        fireEvent.press(cardElement);
        expect(onPressMock).toHaveBeenCalled();
    });
});
