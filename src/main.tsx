import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initInstallPromptListener } from './installPrompt';

// Initialize PWA install prompt interceptor
initInstallPromptListener();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Cafe Service Worker only on Cafe domain or localhost
const hostname = window.location.hostname;
const isAllowedDomain = 
  hostname.includes('leevaakkicafe') || 
  hostname.includes('localhost') || 
  hostname.includes('127.0.0.1');

if (isAllowedDomain && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        console.log('[SW] Cafe service worker registered:', reg.scope);
      })
      .catch((err) => {
        console.error('[SW] Cafe service worker registration failed:', err);
      });
  });
}
