/** Formato padrão de erro retornado pela API (ajustar ao contrato real do backend). */
export interface ApiError {
  message: string;
  code?: string;
}

export class ApiRequestError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
  }
}
