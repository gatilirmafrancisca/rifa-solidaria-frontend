export interface ParticipantFormData {
  fullName: string;
  whatsapp: string;
  email: string;
}

export interface ParticipantFormErrors {
  fullName?: string;
  whatsapp?: string;
  email?: string;
}

export interface ConfirmNumberPayload extends ParticipantFormData {
  number: number;
  orderId: string | null;
}

export interface ConfirmNumberResponse {
  confirmed: boolean;
  number: number;
}

/** Erro específico de corrida: o número foi escolhido por outra pessoa
 * entre o carregamento da grade e o envio do formulário. */
export const NUMBER_ALREADY_TAKEN_CODE = "NUMBER_ALREADY_TAKEN";
