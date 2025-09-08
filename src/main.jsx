// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './store/store'; // adapt path if needed
import createEmotionCache from './createEmotionCache';
import theme from './theme';

const cacheRtl = createEmotionCache(); // <-- CALL the factory to create the cache

// ensure document-level RTL
if (typeof document !== 'undefined') {
  document.documentElement.dir = theme.direction || 'rtl';
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div dir={theme.direction || 'rtl'}>
            {/* Keep BrowserRouter here if App uses <Routes> internally */}
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>,
);
