import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";

export function PagarPage() {
  const [erro, setErro] = useState(false);

  useEffect(() => {
    apiClient
      .get<{ initPoint: string }>("/rifa/criar-pagamento")
      .then(({ initPoint }) => {
        window.location.href = initPoint;
      })
      .catch(() => setErro(true));
  }, []);

  if (erro) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-sm text-carvao/70">
          Não conseguimos abrir o pagamento agora. Tenta de novo em
          instantes ou fala com a gente pelo Instagram do Gatil.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-sm text-carvao/50">Abrindo o pagamento...</p>
    </div>
  );
}