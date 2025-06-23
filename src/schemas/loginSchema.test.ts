import { loginSchema } from './loginSchema';

describe('loginSchema', () => {
    it('valida um login válido', () => {
        const data = { email: 'user@email.com', senha: '123456' };
        const result = loginSchema.safeParse(data);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(data);
    });

    it('retorna erro para email inválido', () => {
        const data = { email: 'user', senha: '123456' };
        const result = loginSchema.safeParse(data);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toMatch(/Email inválido/);
    });

    it('retorna erro para senha curta', () => {
        const data = { email: 'user@email.com', senha: '123' };
        const result = loginSchema.safeParse(data);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toMatch(/pelo menos 6 caracteres/);
    });
});
