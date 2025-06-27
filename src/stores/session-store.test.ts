import { act } from '@testing-library/react-native';
import { useSessionStore } from './session-store';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
}));

describe('useSessionStore', () => {
    beforeEach(() => {
        useSessionStore.getState().clearSession();
    });

    it('inicia com valores nulos', () => {
        const state = useSessionStore.getState();
        expect(state.accessToken).toBeNull();
        expect(state.refreshToken).toBeNull();
        expect(state.userId).toBeNull();
    });

    it('setSession atualiza os valores', () => {
        act(() => {
            useSessionStore.getState().setSession('tokenA', 'tokenR', 'user1');
        });
        const state = useSessionStore.getState();
        expect(state.accessToken).toBe('tokenA');
        expect(state.refreshToken).toBe('tokenR');
        expect(state.userId).toBe('user1');
    });

    it('clearSession zera os valores', () => {
        act(() => {
            useSessionStore.getState().setSession('tokenA', 'tokenR', 'user1');
            useSessionStore.getState().clearSession();
        });
        const state = useSessionStore.getState();
        expect(state.accessToken).toBeNull();
        expect(state.refreshToken).toBeNull();
        expect(state.userId).toBeNull();
    });
});
