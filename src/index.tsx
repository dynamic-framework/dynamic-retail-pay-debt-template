import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  DContextProvider,
  DModalContextProvider,
  DToastContainer,
} from '@dynamic-framework/ui-react';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ModalPaymentAlternatives from './components/ModalPaymentAlternatives';
import ModalConfirmPayment from './components/ModalConfirmPayment';
import ModalAutoDebt from './components/ModalAutoDebt';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';

import type { ModalAvailablePayload } from './interface';

const root = ReactDOM.createRoot(document.getElementById('payDebtTemplate') as Element);
root.render(
  <React.StrictMode>
    <DContextProvider>
      <Provider store={store}>
        <DModalContextProvider<ModalAvailablePayload>
          portalName="modalPortal"
          availableModals={{
            confirmPayment: ModalConfirmPayment,
            paymentAlternatives: ModalPaymentAlternatives,
            autoDebt: ModalAutoDebt,
          }}
        >
          <App />
          <DToastContainer />
        </DModalContextProvider>
      </Provider>
    </DContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
