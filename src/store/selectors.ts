import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getIsPaid = createSelector(
  getState,
  (widget) => widget.isPaid,
);

export const getAccounts = createSelector(
  getState,
  (widget) => widget.accounts,
);
export const getSelectedAccount = createSelector(
  getState,
  (widget) => widget.selectedAccount,
);

export const getAmountUsed = createSelector(
  getState,
  (widget) => widget.amountUsed ?? 0,
);

export const getAccountToPay = createSelector(
  getState,
  (widget) => widget.accountToPay,
);

export const getDebt = createSelector(
  getState,
  (widget) => widget.debt,
);

export const getResult = createSelector(
  getState,
  (widget) => widget.result,
);
