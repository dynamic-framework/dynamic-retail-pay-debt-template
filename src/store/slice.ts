import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, Transaction } from '@modyo-dynamic/modyo-service-retail';

export type Debt = {
  minimumPayment: number;
  totalPayment: number;
};

export type WidgetState = {
  isPaid?: boolean;
  debt: Debt;
  products: Array<Product>;
  selectedProduct?: Product;
  productToPay?: Product;
  amountUsed?: number;
  result?: Transaction;
};

export const initialState = {
  isPaid: false,
  products: [],
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
    setProducts(state, action: PayloadAction<Array<Product>>) {
      state.products = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<Product | undefined>) {
      state.selectedProduct = action.payload;
    },
    setAmountUsed(state, action: PayloadAction<number | undefined>) {
      state.amountUsed = action.payload;
    },
    setResult(state, action: PayloadAction<Transaction>) {
      state.result = action.payload;
    },
    setProductToPay(state, action: PayloadAction<Product | undefined>) {
      state.productToPay = action.payload;
    },
    setDebt(state, action: PayloadAction<Debt>) {
      state.debt = action.payload;
    },
  },
});

export const {
  setIsPaid,
  setProducts,
  setSelectedProduct,
  setAmountUsed,
  setResult,
  setProductToPay,
  setDebt,
} = slice.actions;
export default slice.reducer;
