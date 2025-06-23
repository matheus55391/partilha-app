import api from '@/lib/axios';
import { login } from './loginService';

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
