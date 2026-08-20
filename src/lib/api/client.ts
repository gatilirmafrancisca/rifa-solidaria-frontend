import { ApiRequestError } from "@/types/api";

const BASE_URL = import.meta.env.VITE_API_URL;

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

/**
 * Wrapper fino sobre fetch. Centraliza a URL base, o parse de JSON e o
 * tratamento de erro — nenhuma feature deve chamar fetch() diretamente.
 * Quando o backend Express estiver no ar, só VITE_API_URL precisa mudar.
 */
async function request<TResponse>(
  path: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new ApiRequestError(
      payload?.message ?? "Erro inesperado ao falar com o servidor.",
      response.status,
      payload?.code
    );
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
};
