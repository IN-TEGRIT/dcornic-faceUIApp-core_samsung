import React from "react";

interface IUserInfoContext {
  building: string;
}
const UserInfoContext = React.createContext<IUserInfoContext>({
  building: "lotte_folk_museum",
});

const DEFAULT_BUILDING = "lotte_folk_museum";
export function UserInfoContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserInfoContext.Provider value={{
      building: DEFAULT_BUILDING,
    }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoContext;