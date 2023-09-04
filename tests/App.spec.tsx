import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { LiquidContextProvider, ModalContextProvider } from '@dynamic-framework/ui-react';

import '../src/config/liquidConfig';

import setupStore from './setupStore';
import App from '../src/App';

describe('App functionality', () => {
  let store: Store;

  beforeEach(() => {
    store = setupStore();
  });

  test('renders without crashing', async () => {
    await act(async () => {
      render(
        <LiquidContextProvider>
          <Provider store={store}>
            <ModalContextProvider
              portalName="thePortal"
              availableModals={{}}
            >
              <App />
            </ModalContextProvider>
          </Provider>
        </LiquidContextProvider>,
      );
    });
  });
});
