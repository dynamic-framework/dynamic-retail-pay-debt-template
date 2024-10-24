import {
  DContextProvider,
  DToastContainer,
} from '@dynamic-framework/ui-react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import ModalAutoDebt from './components/modals/ModalAutoDebt';
import ModalConfirmPayment from './components/modals/ModalConfirmPayment';
import ModalPaymentAlternatives from './components/modals/ModalPaymentAlternatives';
import type { PortalAvailablePayload } from './interface';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';

const root = ReactDOM.createRoot(document.getElementById('payDebtTemplate') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <DContextProvider<PortalAvailablePayload>
        portalName="modalPortal"
        availablePortals={{
          modalConfirmPayment: ModalConfirmPayment,
          modalPaymentAlternatives: ModalPaymentAlternatives,
          modalAutoDebt: ModalAutoDebt,
        }}
      >
        <App />
        <DToastContainer position="top-right" />
      </DContextProvider>
    </Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
