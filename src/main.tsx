import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // 👉 Import component App (giao diện chính)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App /> {/* 👉 Render component App tại đây */}
  </StrictMode>,
);