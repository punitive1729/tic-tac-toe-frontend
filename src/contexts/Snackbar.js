import { createContext, useState, useEffect } from 'react';
import {
  INVISIBLE_SNACKBAR_CONTEXT_TYPE,
  GENERAL_SNACKBAR_CONTEXT_TYPE,
} from '../constants';

export const SnackbarContext = createContext();

export const SnackbarContextProvider = ({ children }) => {
  const [snackbarContext, setSnackbarContext] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    if (
      snackbarContext.type !== INVISIBLE_SNACKBAR_CONTEXT_TYPE &&
      snackbarContext.type !== GENERAL_SNACKBAR_CONTEXT_TYPE
    ) {
      const timer = setTimeout(() => {
        setSnackbarContext({ type: '', message: '' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [snackbarContext]);

  const value = { snackbarContext, setSnackbarContext };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
