import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import '@dynamic-framework/ui/dist/css/dynamic-ui.css';
import '@dynamic-framework/ui-react/dist/css/dynamic-ui-react.css';

import {
  LiquidContextProvider,
  ModalContextProvider,
  MToastContainer,
} from '@dynamic-framework/ui-react';

import './style/base.scss';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ModalPaymentAlternatives from './components/ModalPaymentAlternatives';
import ModalConfirmPayment from './components/ModalConfirmPayment';
import ModalAutoDebt from './components/ModalAutoDebt';

const root = ReactDOM.createRoot(document.getElementById('payDebt') as Element);
root.render(
  <React.StrictMode>
    <LiquidContextProvider>
      <Provider store={store}>
        <ModalContextProvider
          portalName="modalPortal"
          availableModals={{
            confirmPayment: ModalConfirmPayment,
            paymentAlternatives: ModalPaymentAlternatives,
            autoDebt: ModalAutoDebt,
          }}
        >
          <App />
          <MToastContainer />
        </ModalContextProvider>
      </Provider>
    </LiquidContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
