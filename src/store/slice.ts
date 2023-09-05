import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  DepositAccount,
  LoanAccount,
  Transaction,
} from '../services/interface';

export type Debt = {
  minimumPayment: number;
  totalPayment: number;
};

export type WidgetState = {
  isPaid?: boolean;
  debt: Debt;
  accounts: Array<DepositAccount>;
  selectedAccount?: DepositAccount;
  accountToPay?: LoanAccount;
  amountUsed?: number;
  result?: Transaction;
};

export const initialState = {
  isPaid: false,
  accounts: [],
  debt: {
    minimumPayment: 0,
    totalPayment: 0,
  },
  result: undefined,
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setIsPaid(state, action: PayloadAction<boolean>) {
      state.isPaid = action.payload;
    },
    setAccounts(state, action: PayloadAction<Array<DepositAccount>>) {
      state.accounts = action.payload;
    },
    setSelectedAccount(state, action: PayloadAction<DepositAccount | undefined>) {
      state.selectedAccount = action.payload;
    },
    setAmountUsed(state, action: PayloadAction<number | undefined>) {
      state.amountUsed = action.payload;
    },
    setResult(state, action: PayloadAction<Transaction>) {
      state.result = action.payload;
    },
    setAccountToPay(state, action: PayloadAction<LoanAccount | undefined>) {
      state.accountToPay = action.payload;
    },
    setDebt(state, action: PayloadAction<Debt>) {
      state.debt = action.payload;
    },
  },
});

export const {
  setIsPaid,
  setAccounts,
  setSelectedAccount,
  setAmountUsed,
  setResult,
  setAccountToPay,
  setDebt,
} = slice.actions;
export default slice.reducer;
