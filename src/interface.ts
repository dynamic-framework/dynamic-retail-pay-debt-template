export type PortalAvailablePayload = {
  modalAutoDebt: {
    isActive: boolean;
    onAccept: (autoDebt: boolean) => void;
  };
  modalConfirmPayment: {
    isAutoDebt: boolean;
    paymentType: string;
  };
  modalPaymentAlternatives: undefined;
};
