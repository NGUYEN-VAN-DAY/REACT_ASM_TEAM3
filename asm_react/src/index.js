import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';  // Import CookiesProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>  {/* Bọc App trong CookiesProvider */}
      <App />
    </CookiesProvider>
  </React.StrictMode>
);

// Nếu bạn muốn đo hiệu suất của ứng dụng, có thể truyền hàm để ghi kết quả
reportWebVitals();
