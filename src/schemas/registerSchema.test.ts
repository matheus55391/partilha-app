import { registerSchema } from './registerSchema';

describe('registerSchema', () => {
    it('valida um registro válido', () => {
        const data = { name: 'Matheus', email: 'user@email.com', password: '123456' };
        const result = registerSchema.safeParse(data);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(data);
    });

    it('retorna erro para nome curto', () => {
        const data = { name: 'M', email: 'user@email.com', password: '123456' };
        const result = registerSchema.safeParse(data);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toMatch(/Nome obrigatório/);
    });

    it('retorna erro para email inválido', () => {
        const data = { name: 'Matheus', email: 'user', password: '123456' };
        const result = registerSchema.safeParse(data);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toMatch(/Email inválido/);
    });

    it('retorna erro para senha curta', () => {
        const data = { name: 'Matheus', email: 'user@email.com', password: '123' };
        const result = registerSchema.safeParse(data);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toMatch(/pelo menos 6 caracteres/);
    });
});
