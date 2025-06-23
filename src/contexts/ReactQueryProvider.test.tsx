import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { ReactQueryProvider } from './ReactQueryProvider';

describe('ReactQueryProvider', () => {
    it('renderiza o QueryClientProvider corretamente', () => {
        const { getByTestId } = render(
            <ReactQueryProvider>
                <TestComponent />
            </ReactQueryProvider>
        );
        expect(getByTestId('test-component')).toBeTruthy();
    });
});

function TestComponent() {
    return <Text testID="test-component">Test</Text>;
}
