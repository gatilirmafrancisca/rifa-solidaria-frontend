import { clsx } from "clsx";
import { padNumber } from "@/lib/utils/format";

interface NumberCellProps {
  number: number;
  isTaken: boolean;
  isSelected: boolean;
  onSelect: (number: number) => void;
}

export function NumberCell({
  number,
  isTaken,
  isSelected,
  onSelect,
}: NumberCellProps) {
  return (
    <button
      type="button"
      disabled={isTaken}
      onClick={() => onSelect(number)}
      aria-label={`Número ${number}, ${isTaken ? "indisponível" : "disponível"}`}
      className={clsx(
        "aspect-square min-h-[44px] rounded-lg border font-display text-xs font-bold transition",
        isTaken &&
          "cursor-not-allowed border-carvao/10 bg-carvao/10 text-carvao/30 line-through",
        !isTaken &&
          !isSelected &&
          "border-verde bg-white text-verde-escuro hover:-translate-y-0.5 hover:bg-verde/5",
        isSelected && "scale-105 border-laranja bg-laranja text-carvao"
      )}
    >
      {padNumber(number)}
    </button>
  );
}
