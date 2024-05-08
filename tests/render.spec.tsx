import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import { DContextProvider, DModalContextProvider } from '@dynamic-framework/ui-react';
import { Provider } from 'react-redux';
import store from '../src/store/store';


describe('App', () => {
  it('renders without crashing', () => {
    render(
      <DContextProvider>
        <Provider store={store}>
          <DModalContextProvider
            portalName="modalPortal"
            availableModals={{}}
          >
            <App />
          </DModalContextProvider>
        </Provider>
      </DContextProvider>
    );
  });
});
