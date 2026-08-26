import { useSearchParams } from "react-router-dom";

/**
 * Lê os parâmetros que o PagBank devolve na URL de retorno do
 * checkout (ex: ?order_id=...). O nome do parâmetro fica configurável
 * via env porque ainda não foi confirmado com o suporte do PagBank.
 */
export function useOrderParams() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return { paymentId };
}
