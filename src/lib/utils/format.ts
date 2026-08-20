/** Preenche o número da rifa com zeros à esquerda: 7 -> "007". */
export function padNumber(value: number, size = 3): string {
  return String(value).padStart(size, "0");
}

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
