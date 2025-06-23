import React from "react";

const ExternalEventManagerContext = React.createContext({});

export function ExternalEventManagerContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <ExternalEventManagerContext.Provider value={{}}>
      {children}
    </ExternalEventManagerContext.Provider>
  );
}

export default ExternalEventManagerContext;