import React, { useState } from "react";

const DEFAULT_VALUES = {
  chatgpt: {
    language: "ko",
  }
}
interface IAppDataContext {
  settings: {
    chatgpt: {
      language: string,
    }
  },
  setSettings: (settings: any) => void,
}

const AppSettingsContext = React.createContext<IAppDataContext>({
  settings: DEFAULT_VALUES,
  setSettings: (settings: any) => {},
});

export function AppSettingsContextProvider({ children }: { children: React.ReactNode }) {
  const [ settings, setSettings ] = useState<any>(DEFAULT_VALUES);

  return (
    <AppSettingsContext.Provider value={{
      settings,
      setSettings
    }}>
      {children}
    </AppSettingsContext.Provider>
  )
}

export default AppSettingsContext;