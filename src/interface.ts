export type PortalAvailablePayload = {
  autoDebtModal: {
    isActive: boolean;
    onAccept: (autoDebt: boolean) => void;
  };
  confirmPaymentModal: {
    isAutoDebt: boolean;
    paymentType: string;
  };
  paymentAlternativesModal: undefined;
};
