import React from "react"
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './shared/store/redux/store';

import { queryClient } from "./shared/store/tanstackQuery/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import App from './app/App';
import ThemeProvierWrapper from "./shared/store/theme/ui/ThemeProviderWrapper";
import { OfflineDBProvider } from "./shared/store/offlineDB";

import "./firebase"

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <OfflineDBProvider>
    <Provider store = { store } >
      <QueryClientProvider client = { queryClient } >
        <ThemeProvierWrapper>
          <App />
          <ReactQueryDevtools initialIsOpen = { false } />
        </ThemeProvierWrapper>
      </QueryClientProvider>
    </Provider>
  </OfflineDBProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
