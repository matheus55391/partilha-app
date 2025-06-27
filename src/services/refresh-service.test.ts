import api from '@/lib/axios';
import { refreshToken } from './refresh-service';

jest.mock('@/lib/axios');
const mockedApi = api as jest.Mocked<typeof api>;

describe('refreshService', () => {
    it('faz POST para /auth/refresh e retorna o access_token', async () => {
        mockedApi.post.mockResolvedValueOnce({ data: { access_token: 'a' } });
        const result = await refreshToken({ userId: 'id', refreshToken: 'r' });
        expect(mockedApi.post).toHaveBeenCalledWith('/auth/refresh', { userId: 'id', refreshToken: 'r' });
        expect(result).toEqual({ access_token: 'a' });
    });
});
