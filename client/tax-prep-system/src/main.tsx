import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.tsx';
import './App.css'
import '@trussworks/react-uswds/lib/index.css';


import { Provider } from 'react-redux';
import store  from './store.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>

        </Provider>
  </React.StrictMode>,
)
