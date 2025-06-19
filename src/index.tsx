// // scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
// i18n
import './locales/i18n';

import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// redux
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './redux/store';
// contexts
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { SettingsProvider } from './contexts/SettingsContext';
//
import App from './App';

// ----------------------------------------------------------------------
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ReduxProvider store={store}>
        <HelmetProvider>
          <PersistGate loading={null} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <CollapseDrawerProvider>
                  <BrowserRouter>
                      <App />
                  </BrowserRouter>
                </CollapseDrawerProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </PersistGate>
        </HelmetProvider>
  </ReduxProvider>
);
