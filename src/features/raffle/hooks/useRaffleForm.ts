import { useState } from "react";
import {
  isValidEmail,
  isValidBrazilianPhone,
  isValidFullName,
} from "@/lib/utils/validation";
import { confirmNumber } from "@/lib/api/raffle";
import type {
  ParticipantFormData,
  ParticipantFormErrors,
} from "@/features/raffle/types";

const EMPTY_FORM: ParticipantFormData = {
  fullName: "",
  whatsapp: "",
  email: "",
};

interface UseRaffleFormArgs {
  selectedNumber: number | null;
  orderId: string | null;
}

/**
 * Estado e regras do formulário de participação: validação por campo,
 * envio para a API e o estado de sucesso. Mantido fora do componente
 * de página para ficar testável isoladamente.
 */
export function useRaffleForm({ selectedNumber, orderId }: UseRaffleFormArgs) {
  const [formData, setFormData] = useState<ParticipantFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ParticipantFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedNumber, setConfirmedNumber] = useState<number | null>(null);

  function updateField(field: keyof ParticipantFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): boolean {
    const nextErrors: ParticipantFormErrors = {};
    if (!isValidFullName(formData.fullName)) {
      nextErrors.fullName = "Preenche seu nome completo pra gente, por favor.";
    }
    if (!isValidBrazilianPhone(formData.whatsapp)) {
      nextErrors.whatsapp = "Precisamos de um WhatsApp válido com DDD.";
    }
    if (!isValidEmail(formData.email)) {
      nextErrors.email = "Esse e-mail não parece válido.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit() {
    if (selectedNumber === null || !validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await confirmNumber({
        ...formData,
        number: selectedNumber,
        orderId,
      });
      setConfirmedNumber(result.number);
    } catch {
      // TODO INTEGRAÇÃO API: tratar especificamente o erro de número já
      // escolhido (NUMBER_ALREADY_TAKEN) pedindo pra pessoa escolher outro.
      setSubmitError(
        "Não conseguimos confirmar sua participação agora. Tenta de novo em instantes."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormReady =
    selectedNumber !== null &&
    isValidFullName(formData.fullName) &&
    isValidBrazilianPhone(formData.whatsapp) &&
    isValidEmail(formData.email);

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    confirmedNumber,
    isFormReady,
    updateField,
    submit,
  };
}
