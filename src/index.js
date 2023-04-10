import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarContextProvider } from './contexts/Snackbar';
import './index.css';
import { UserContextProvider } from './contexts/User.context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SnackbarContextProvider>
  </React.StrictMode>
);
