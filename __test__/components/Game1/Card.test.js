import { render, fireEvent } from '@testing-library/react-native';
import Card from '../../../components/Game1/Card';

describe('Card', () => {
    it('displays the children when isTurnedOver is true', () => {
        const { getByText } = render(
            <Card isTurnedOver={true} onPress={() => {}}>
                🥹
            </Card>
        );

        expect(getByText('🥹')).toBeTruthy();
    });

    it('displays "?" when isTurnedOver is false', () => {
        const { getByText } = render(
            <Card isTurnedOver={false} onPress={() => {}}>
                🥹
            </Card>
        );

        expect(getByText('?')).toBeTruthy();
    });

    it('invokes onPress callback when pressed', () => {
        const onPressMock = jest.fn();
        const { getByTestId } = render(
            <Card isTurnedOver={false} onPress={onPressMock} testID="card">
                🥹
            </Card>
        );

        fireEvent.press(getByTestId('card'));

        expect(onPressMock).toHaveBeenCalled();
    });
});
