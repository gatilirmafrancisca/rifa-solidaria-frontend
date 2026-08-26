import { ApiRequestError } from "@/types/api";

interface VerificarPagamentoResponse {
  token: string;
}

/**
 * Essa rota vive em /mercadopago (ao lado do webhook), fora do
 * prefixo /api que o apiClient sempre adiciona — por isso não usa
 * apiClient.get(), que colaria /api na frente e quebraria o caminho.
 * Centralizado aqui pra essa exceção existir num lugar só, em vez de
 * um fetch avulso repetido em cada tela que precisa checar pagamento.
 */
export async function verificarPagamento(
  paymentId: string
): Promise<VerificarPagamentoResponse> {
  const response = await fetch(
    `/mercadopago/verificar-pagamento?payment_id=${encodeURIComponent(paymentId)}`
  );

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new ApiRequestError(
      payload?.message ?? "Erro ao verificar pagamento.",
      response.status,
      payload?.code,
      payload
    );
  }

  return response.json();
}