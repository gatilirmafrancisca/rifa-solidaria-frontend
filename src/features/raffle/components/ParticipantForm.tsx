import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type {
  ParticipantFormData,
  ParticipantFormErrors,
} from "@/features/raffle/types";

interface ParticipantFormProps {
  formData: ParticipantFormData;
  errors: ParticipantFormErrors;
  isFormReady: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  onFieldChange: (field: keyof ParticipantFormData, value: string) => void;
  onSubmit: () => void;
}

export function ParticipantForm({
  formData,
  errors,
  isFormReady,
  isSubmitting,
  submitError,
  onFieldChange,
  onSubmit,
}: ParticipantFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Input
        label="Nome completo"
        name="fullName"
        placeholder="Como podemos te chamar?"
        autoComplete="name"
        value={formData.fullName}
        error={errors.fullName}
        onChange={(event) => onFieldChange("fullName", event.target.value)}
      />
      <Input
        label="WhatsApp"
        name="whatsapp"
        type="tel"
        placeholder="(71) 9 9999-9999"
        autoComplete="tel"
        value={formData.whatsapp}
        error={errors.whatsapp}
        onChange={(event) => onFieldChange("whatsapp", event.target.value)}
      />
      <Input
        label="E-mail"
        name="email"
        type="email"
        placeholder="seuemail@exemplo.com"
        autoComplete="email"
        value={formData.email}
        error={errors.email}
        onChange={(event) => onFieldChange("email", event.target.value)}
      />

      {submitError && (
        <p className="mb-3 text-xs text-red-500" role="alert">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        disabled={!isFormReady || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Confirmando..." : "Confirmar minha participação"}
      </Button>
      <p className="mt-2.5 text-center text-[11px] leading-relaxed text-carvao/40">
        Ao confirmar, você recebe um e-mail com seu número e todos os
        detalhes do sorteio.
      </p>
    </form>
  );
}
