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

// Nomes de campo aqui batem com o que o backend espera (name/phone/
// claimedNumber, ver validarConfirmacaoRifa) — não com os nomes do
// formulário em si. O paymentId NÃO entra aqui: quem autoriza a
// confirmação é o token, enviado como header, nunca o corpo.
export interface ConfirmNumberPayload {
  name: string;
  phone: string;
  email: string;
  claimedNumber: number;
}

export interface ConfirmNumberResponse {
  id: string;
  claimedNumber: number;
}