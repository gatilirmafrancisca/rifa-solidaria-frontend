import { useMemo, useRef, useState } from "react";
import { NumberCell } from "@/features/raffle/components/NumberCell";
import { TOTAL_NUMBERS } from "@/features/raffle/constants";
import { padNumber } from "@/lib/utils/format";

interface NumberGridProps {
  takenNumbers: Set<number>;
  selectedNumber: number | null;
  onSelect: (number: number) => void;
}

const BLOCK_SIZE = 50;

/** Divide 1..TOTAL_NUMBERS em blocos de 50 para facilitar a leitura. */
function buildBlocks(): number[][] {
  const blocks: number[][] = [];
  for (let start = 1; start <= TOTAL_NUMBERS; start += BLOCK_SIZE) {
    const end = Math.min(start + BLOCK_SIZE - 1, TOTAL_NUMBERS);
    blocks.push(Array.from({ length: end - start + 1 }, (_, i) => start + i));
  }
  return blocks;
}

export function NumberGrid({
  takenNumbers,
  selectedNumber,
  onSelect,
}: NumberGridProps) {
  const blocks = useMemo(buildBlocks, []);
  const [searchValue, setSearchValue] = useState("");
  const cellRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    const value = Number(searchValue);
    if (!value || value < 1 || value > TOTAL_NUMBERS) return;
    cellRefs.current.get(value)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-[0_6px_18px_rgba(26,83,49,0.10)]">
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold text-verde-escuro">
          Números disponíveis
        </h2>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Buscar número (ex: 237)"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyDown={handleSearch}
          className="w-48 rounded-full border border-carvao/15 px-4 py-2 text-sm outline-none focus:border-verde"
        />
      </div>

      <div className="mb-3.5 flex flex-wrap gap-4 text-xs text-carvao/60">
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-3 w-3 rounded border border-verde bg-white" />
          Disponível
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-3 w-3 rounded bg-laranja" />
          Seu número
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-3 w-3 rounded bg-carvao/20" />
          Já escolhido
        </span>
      </div>

      <div className="max-h-[480px] overflow-y-auto rounded-2xl border border-carvao/10 bg-neutro/60 p-3.5">
        {blocks.map((block) => (
          <div key={block[0]} className="mb-3.5 last:mb-0">
            <p className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wide text-carvao/40">
              {padNumber(block[0])} — {padNumber(block[block.length - 1])}
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(44px,1fr))] gap-1.5">
              {block.map((number) => (
                <div
                  key={number}
                  ref={(element) => {
                    if (element) cellRefs.current.set(number, element);
                  }}
                >
                  <NumberCell
                    number={number}
                    isTaken={takenNumbers.has(number)}
                    isSelected={selectedNumber === number}
                    onSelect={onSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
