import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import { DContextProvider } from '@dynamic-framework/ui-react';
import { Provider } from 'react-redux';
import store from '../src/store/store';


describe('App', () => {
  it('renders without crashing', () => {
    render(
      <DContextProvider
        portalName="modalPortal"
      >
        <Provider store={store}>
          <App />
        </Provider>
      </DContextProvider>
    );
  });
});
