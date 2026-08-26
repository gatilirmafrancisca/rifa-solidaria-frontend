import { apiClient } from "@/lib/api/client";
import type {
  ConfirmNumberPayload,
  ConfirmNumberResponse,
} from "@/features/raffle/types";

/**
 * Camada de acesso à API da rifa. As páginas/hooks nunca chamam
 * apiClient diretamente — sempre passam por aqui.
 */

export async function fetchTakenNumbers(): Promise<number[]> {
  const response = await apiClient.get<{ message: string; data: number[] }>(
    "/rifa/numeros-ocupados"
  );
  return response.data;
}

export async function confirmNumber(
  token: string,
  payload: ConfirmNumberPayload
): Promise<ConfirmNumberResponse> {
  // O token (não o paymentId) é quem autoriza a confirmação — o backend
  // extrai o paymentId de dentro dele, nunca do corpo da requisição.
  const response = await apiClient.post<{ message: string; data: ConfirmNumberResponse }>(
    "/rifa/confirmar-numero",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}