import { register } from './registerService';
import api from '@/lib/axios';

jest.mock('@/lib/axios');
const mockedApi = api as jest.Mocked<typeof api>;

describe('registerService', () => {
  it('faz POST para /auth/register e retorna os dados', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: { id: '1', email: 'e', name: 'n' } });
    const result = await register({ email: 'e', password: 'p', name: 'n' });
    expect(mockedApi.post).toHaveBeenCalledWith('/auth/register', { email: 'e', password: 'p', name: 'n' });
    expect(result).toEqual({ id: '1', email: 'e', name: 'n' });
  });
});
