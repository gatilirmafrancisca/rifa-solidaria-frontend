// A camada de API real usará este cliente assim que os endpoints
// abaixo forem trocados pelas chamadas comentadas (ver TODOs).
// import { apiClient } from "@/lib/api/client";
import { MOCK_TAKEN_NUMBERS } from "@/features/raffle/constants";
import type {
  ConfirmNumberPayload,
  ConfirmNumberResponse,
} from "@/features/raffle/types";

/**
 * Camada de acesso à API da rifa. As páginas/hooks nunca chamam
 * apiClient diretamente — sempre passam por aqui, para o contrato da
 * API mudar em um único lugar quando o backend for conectado.
 *
 * TODO INTEGRAÇÃO API: troque os corpos das duas funções abaixo pelas
 * chamadas reais assim que os endpoints do Express existirem:
 *   GET  /api/rifa/numeros-disponiveis
 *   POST /api/rifa/confirmar-numero
 */

export async function fetchTakenNumbers(): Promise<number[]> {
  // TODO INTEGRAÇÃO API — versão real:
  // return apiClient.get<number[]>("/rifa/numeros-ocupados");
  return Promise.resolve(MOCK_TAKEN_NUMBERS);
}

export async function confirmNumber(
  payload: ConfirmNumberPayload
): Promise<ConfirmNumberResponse> {
  // TODO INTEGRAÇÃO API — versão real:
  // return apiClient.post<ConfirmNumberResponse>("/rifa/confirmar-numero", payload);
  //
  // O backend deve validar se o número ainda está livre (checagem
  // atômica no Mongo) e, se confirmar, disparar o e-mail automático de
  // agradecimento com o número escolhido.
  return Promise.resolve({ confirmed: true, number: payload.number });
}
