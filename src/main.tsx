import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign Vite WebSocket HMR closed errors in the AI Studio sandboxed preview
if (typeof window !== 'undefined') {
  const isViteWSWarning = (msg: string) => 
    msg.includes('WebSocket') || 
    msg.includes('failed to connect to websocket') || 
    msg.includes('wss://') || 
    msg.includes('ws://');

  window.addEventListener('unhandledrejection', (event) => {
    const reasonStr = event.reason ? String(event.reason.message || event.reason) : '';
    if (isViteWSWarning(reasonStr)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const errorMsg = event.message || '';
    if (isViteWSWarning(errorMsg)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

