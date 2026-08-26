/** Formato padrão de erro retornado pela API (ajustar ao contrato real do backend). */
export interface ApiError {
  message: string;
  code?: string;
}

export class ApiRequestError extends Error {
  status: number;
  code?: string;
  // Corpo completo da resposta de erro — permite ler campos extras
  // além de "message", como o "claimedNumber" que a rota de verificar
  // pagamento devolve quando o pagamento já escolheu um número.
  data?: unknown;

  constructor(message: string, status: number, code?: string, data?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
    this.data = data;
  }
}