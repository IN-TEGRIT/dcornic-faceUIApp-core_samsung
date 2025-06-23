import React, { useState } from "react";

const InternalEventManagerContext = React.createContext({});


export function InternalEventManagerContextProvider({ children }: { children: React.ReactNode }) {
  const [touchState, setTouchState] = useState();
  
  return (
    <InternalEventManagerContext.Provider value={{}}>
      {children}
    </InternalEventManagerContext.Provider>
  );
}

export default InternalEventManagerContext;