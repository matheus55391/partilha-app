import { AxiosError } from 'axios';

export function getErrorMessage(error: Error): string {
    if (error instanceof AxiosError) {
        // Erro de resposta do servidor
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            // Se há uma mensagem específica do servidor
            if (data && typeof data === 'object' && 'message' in data) {
                return data.message as string;
            }

            // Mensagens padrão baseadas no status HTTP
            switch (status) {
                case 400:
                    return 'Dados inválidos. Verifique as informações fornecidas.';
                case 401:
                    return 'Email ou senha incorretos.';
                case 403:
                    return 'Acesso negado.';
                case 404:
                    return 'Serviço não encontrado.';
                case 409:
                    return 'Este email já está em uso.';
                case 422:
                    return 'Dados inválidos. Verifique as informações fornecidas.';
                case 500:
                    return 'Erro interno do servidor. Tente novamente mais tarde.';
                default:
                    return `Erro no servidor (${status}). Tente novamente.`;
            }
        }

        // Erro de rede
        if (error.request) {
            return 'Erro de conexão. Verifique sua internet e tente novamente.';
        }
    }

    // Erro genérico
    return error.message || 'Ocorreu um erro inesperado. Tente novamente.';
}
