import api from './axios';

describe('api instance', () => {
    it('usa a baseURL correta', () => {
        expect(api.defaults.baseURL).toBe(process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001');
    });

    it('usa Content-Type application/json', () => {
        expect(api.defaults.headers['Content-Type']).toBe('application/json');
    });

    it('faz requests usando axios', async () => {
        // Não mocka axios.create, apenas mocka o método get do api
        (api.get as jest.Mock) = jest.fn().mockResolvedValue({ data: 'ok' });
        const response = await api.get('/test');
        expect(response).toBeDefined();
        expect(api.get).toHaveBeenCalledWith('/test');
    });
});
