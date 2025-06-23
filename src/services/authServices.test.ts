import api from '@/lib/axios';
import { login } from './loginService';
import { refreshToken } from './refreshService';
import { register } from './registerService';

jest.mock('@/lib/axios');
const mockedApi = api as jest.Mocked<typeof api>;

describe('loginService', () => {
    it('faz POST para /auth/login e retorna os dados', async () => {
        mockedApi.post.mockResolvedValueOnce({ data: { access_token: 'a', refresh_token: 'r' } });
        const result = await login({ email: 'user@email.com', password: '123456' });
        expect(mockedApi.post).toHaveBeenCalledWith('/auth/login', { email: 'user@email.com', password: '123456' });
        expect(result).toEqual({ access_token: 'a', refresh_token: 'r' });
    });
});

describe('refreshService', () => {
    it('faz POST para /auth/refresh e retorna o access_token', async () => {
        mockedApi.post.mockResolvedValueOnce({ data: { access_token: 'a' } });
        const result = await refreshToken({ userId: 'id', refreshToken: 'r' });
        expect(mockedApi.post).toHaveBeenCalledWith('/auth/refresh', { userId: 'id', refreshToken: 'r' });
        expect(result).toEqual({ access_token: 'a' });
    });
});

describe('registerService', () => {
    it('faz POST para /auth/register e retorna os dados', async () => {
        mockedApi.post.mockResolvedValueOnce({ data: { id: '1', email: 'e', name: 'n' } });
        const result = await register({ email: 'e', password: 'p', name: 'n' });
        expect(mockedApi.post).toHaveBeenCalledWith('/auth/register', { email: 'e', password: 'p', name: 'n' });
        expect(result).toEqual({ id: '1', email: 'e', name: 'n' });
    });
});
