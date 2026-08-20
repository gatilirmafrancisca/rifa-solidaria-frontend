import { padNumber } from "@/lib/utils/format";

interface SelectedNumberPanelProps {
  selectedNumber: number | null;
  onChangeNumber: () => void;
}

export function SelectedNumberPanel({
  selectedNumber,
  onChangeNumber,
}: SelectedNumberPanelProps) {
  return (
    <div className="py-1.5 text-center">
      <p className="text-xs font-extrabold uppercase tracking-wide text-carvao/40">
        Número selecionado
      </p>
      {selectedNumber === null ? (
        <p className="my-1.5 text-xl text-carvao/30">Toque em um número</p>
      ) : (
        <>
          <p className="my-1 font-display text-4xl font-bold text-verde-escuro">
            {padNumber(selectedNumber)}
          </p>
          <button
            type="button"
            onClick={onChangeNumber}
            className="text-xs font-bold text-verde underline"
          >
            Trocar número
          </button>
        </>
      )}
    </div>
  );
}
