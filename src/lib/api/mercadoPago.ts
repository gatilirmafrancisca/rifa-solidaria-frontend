import { ApiRequestError } from "@/types/api";

interface VerificarPagamentoResponse {
  token: string;
}


const BACKEND_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/api\/?$/, "");


export async function verificarPagamento(
  paymentId: string
): Promise<VerificarPagamentoResponse> {
  const response = await fetch(
    `${BACKEND_URL}/mercadopago/verificar-pagamento?payment_id=${encodeURIComponent(paymentId)}`
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