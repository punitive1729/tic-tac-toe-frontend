import { createContext, useEffect, useState } from 'react';
export const UserContext = createContext();
export const InitialUserContext = {
  userName: '',
  roomId: '',
  token: '',
  symbol: '',
  id: '',
  myMove: false,
};
export const UserContextProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(InitialUserContext);
  const value = { userContext, setUserContext };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
