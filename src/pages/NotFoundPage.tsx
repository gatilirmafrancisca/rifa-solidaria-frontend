import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-verde-escuro">
        Página não encontrada
      </h1>
      <p className="text-sm text-carvao/70">
        O endereço que você acessou não existe ou foi movido.
      </p>
      <Link
        to="/"
        className="rounded-full bg-verde px-6 py-2.5 font-display text-sm font-bold text-white transition hover:bg-verde-escuro"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
