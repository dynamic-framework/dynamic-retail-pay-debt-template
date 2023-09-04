import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getIsPaid = createDraftSafeSelector(
  getState,
  (widget) => widget.isPaid,
);

export const getProducts = createDraftSafeSelector(
  getState,
  (widget) => widget.products,
);
export const getSelectedProduct = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedProduct,
);

export const getAmountUsed = createDraftSafeSelector(
  getState,
  (widget) => widget.amountUsed ?? 0,
);

export const getProductToPay = createDraftSafeSelector(
  getState,
  (widget) => widget.productToPay,
);

export const getDebt = createDraftSafeSelector(
  getState,
  (widget) => widget.debt,
);

export const getResult = createDraftSafeSelector(
  getState,
  (widget) => widget.result,
);
