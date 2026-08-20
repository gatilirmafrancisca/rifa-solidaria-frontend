import { useEffect, useState } from "react";
import { fetchTakenNumbers } from "@/lib/api/raffle";

interface UseAvailableNumbersResult {
  takenNumbers: Set<number>;
  isLoading: boolean;
  error: string | null;
}

/** Busca quais números já foram escolhidos, para desenhar a grade. */
export function useAvailableNumbers(): UseAvailableNumbersResult {
  const [takenNumbers, setTakenNumbers] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchTakenNumbers()
      .then((numbers) => {
        if (isMounted) setTakenNumbers(new Set(numbers));
      })
      .catch(() => {
        if (isMounted) {
          setError("Não conseguimos carregar os números agora. Atualize a página.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { takenNumbers, isLoading, error };
}
