import { padNumber } from "@/lib/utils/format";
import { RAFFLE_DATE_LABEL } from "@/features/raffle/constants";
import { PostConfirmationActions } from "@/features/raffle/components/PostConfirmationActions";

interface SuccessOverlayProps {
  confirmedNumber: number;
}

export function SuccessOverlay({ confirmedNumber }: SuccessOverlayProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-verde-escuro/90 p-5"
    >
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center">
        <div className="mx-auto mb-3.5 flex h-14 w-14 items-center justify-center rounded-full bg-laranja text-2xl">
          🐾
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-verde-escuro">
          Prontinho!
        </h3>
        <p className="my-1.5 font-display text-4xl font-bold text-laranja">
          {padNumber(confirmedNumber)}
        </p>
        <p className="mb-6 text-sm leading-relaxed text-carvao/70">
          Sua participação está confirmada. Te mandamos um e-mail com todos
          os detalhes — nos vemos no sorteio, dia {RAFFLE_DATE_LABEL}, ao
          vivo no Instagram!
        </p>
        <PostConfirmationActions />
      </div>
    </div>
  );
}