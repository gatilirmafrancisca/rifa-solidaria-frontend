import { formatCurrencyBRL } from "@/lib/utils/format";
import { TICKET_PRICE_BRL } from "@/features/raffle/constants";

interface SuccessBannerProps {
  paymentId: string | null;
}

export function SuccessBanner({ paymentId }: SuccessBannerProps) {
  return (
    <div className="mb-7 flex items-start gap-3 rounded-2xl border border-verde/20 border-l-4 border-l-verde bg-white p-4 shadow-sm">
      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-verde">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-display text-base font-bold">Pagamento aprovado!</p>
        <p className="text-sm text-carvao/70">
          Recebemos sua contribuição de {formatCurrencyBRL(TICKET_PRICE_BRL)}.
          Agora é só escolher seu número.
        </p>
      </div>
      <p className="whitespace-nowrap pt-0.5 text-xs text-carvao/40">
        {paymentId ? `Pedido #${paymentId}` : "Pedido —"}
      </p>
    </div>
  );
}
