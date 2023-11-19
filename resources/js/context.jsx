import { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    !confirmation ? setShowConfirmation(false) : setShowConfirmation(true)
  }, [confirmation])

  return (
    <AppContext.Provider value={{
      showConfirmation,
      confirmation,
      setConfirmation
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
