import React from 'react';
import userStore from '../stores/UserStore';

const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
}

export default UserContext;
