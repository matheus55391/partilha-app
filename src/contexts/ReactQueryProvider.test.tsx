import React from 'react';
import { render } from '@testing-library/react-native';
import { ReactQueryProvider } from './ReactQueryProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Text } from 'react-native';

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
