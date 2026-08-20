import { useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { SuccessBanner } from "@/features/raffle/components/SuccessBanner";
import { NumberGrid } from "@/features/raffle/components/NumberGrid";
import { SelectedNumberPanel } from "@/features/raffle/components/SelectedNumberPanel";
import { ParticipantForm } from "@/features/raffle/components/ParticipantForm";
import { SuccessOverlay } from "@/features/raffle/components/SuccessOverlay";
import { useAvailableNumbers } from "@/features/raffle/hooks/useAvailableNumbers";
import { useRaffleForm } from "@/features/raffle/hooks/useRaffleForm";
import { useOrderParams } from "@/hooks/useOrderParams";
import {
  PRIZE_VALUE_BRL,
  RAFFLE_DATE_LABEL,
  TICKET_PRICE_BRL,
  TOTAL_NUMBERS,
} from "@/features/raffle/constants";
import { formatCurrencyBRL } from "@/lib/utils/format";

/**
 * Página exibida logo após o retorno do checkout do PagBank.
 * Orquestra: grade de números (features/raffle) + painel de seleção +
 * formulário + estado de sucesso. Não tem lógica de negócio própria —
 * tudo isso vive nos hooks e componentes que ela compõe.
 */
export function ChooseNumberPage() {
  const { orderId } = useOrderParams();
  const { takenNumbers, isLoading, error } = useAvailableNumbers();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    confirmedNumber,
    isFormReady,
    updateField,
    submit,
  } = useRaffleForm({ selectedNumber, orderId });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 pb-20">
      <SuccessBanner orderId={orderId} />

      <div className="mb-6 text-center">
        <h1 className="mb-2 font-display text-3xl font-bold text-verde-escuro sm:text-4xl">
          Escolha seu número da sorte
        </h1>
        <p className="mx-auto mb-4 max-w-md text-sm text-carvao/70">
          São {TOTAL_NUMBERS} números concorrendo a{" "}
          <strong>{formatCurrencyBRL(PRIZE_VALUE_BRL)}</strong>. O sorteio é
          ao vivo, no Instagram do Gatil, no dia{" "}
          <strong>{RAFFLE_DATE_LABEL}</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Pill>🎟️ {TOTAL_NUMBERS} números</Pill>
          <Pill>💰 {formatCurrencyBRL(TICKET_PRICE_BRL)} cada</Pill>
          <Pill tone="laranja">🏆 Prêmio {formatCurrencyBRL(PRIZE_VALUE_BRL)}</Pill>
          <Pill>📅 Sorteio {RAFFLE_DATE_LABEL}</Pill>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_340px] md:items-start">
        {isLoading ? (
          <div className="rounded-3xl bg-white p-8 text-center text-sm text-carvao/50">
            Carregando números disponíveis...
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white p-8 text-center text-sm text-red-500">
            {error}
          </div>
        ) : (
          <NumberGrid
            takenNumbers={takenNumbers}
            selectedNumber={selectedNumber}
            onSelect={setSelectedNumber}
          />
        )}

        <aside className="rounded-3xl bg-white p-5 shadow-[0_6px_18px_rgba(26,83,49,0.10)] md:sticky md:top-4">
          <SelectedNumberPanel
            selectedNumber={selectedNumber}
            onChangeNumber={() => setSelectedNumber(null)}
          />
          <hr className="my-3.5 border-carvao/10" />
          <ParticipantForm
            formData={formData}
            errors={errors}
            isFormReady={isFormReady}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onFieldChange={updateField}
            onSubmit={submit}
          />
        </aside>
      </div>

      {confirmedNumber !== null && (
        <SuccessOverlay
          confirmedNumber={confirmedNumber}
          onClose={() => {
            // TODO INTEGRAÇÃO API: redirecionar para o Instagram do Gatil
            // ou para uma página de agradecimento definitiva.
          }}
        />
      )}
    </div>
  );
}
