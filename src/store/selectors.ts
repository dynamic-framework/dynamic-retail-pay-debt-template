import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getIsPaid = createDraftSafeSelector(
  getState,
  (widget) => widget.isPaid,
);

export const getAccounts = createDraftSafeSelector(
  getState,
  (widget) => widget.accounts,
);
export const getSelectedAccount = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedAccount,
);

export const getAmountUsed = createDraftSafeSelector(
  getState,
  (widget) => widget.amountUsed ?? 0,
);

export const getAccountToPay = createDraftSafeSelector(
  getState,
  (widget) => widget.accountToPay,
);

export const getDebt = createDraftSafeSelector(
  getState,
  (widget) => widget.debt,
);

export const getResult = createDraftSafeSelector(
  getState,
  (widget) => widget.result,
);
