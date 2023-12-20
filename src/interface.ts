export type ModalAvailablePayload = {
  autoDebt: {
    isActive: boolean;
    onAccept: (autoDebt: boolean) => void;
  };
  confirmPayment: {
    isAutoDebt: boolean;
    paymentType: string;
  };
  paymentAlternatives: undefined;
};
