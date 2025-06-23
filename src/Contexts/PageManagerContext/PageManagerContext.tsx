import React, { useContext, useEffect } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { ETouchState } from "../../Types/Input.d";

import AppActionContext from "../AppActionContext/AppActionContext";
import AppModalContext from "../AppModalContext/AppModalContext";

const PageManagerContext = React.createContext({});

export function PageManagerContextProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { closeDialog } = useContext(AppModalContext);
  const { actionAppTouchState, actionAppVoiceState, setTimeoutRequest } = useContext(AppActionContext);
  let location = useLocation();

  const checkRoute = (includedPath: string) => {
    
    return location.pathname.indexOf(includedPath) === 0;
  }

  useEffect(() => {
    console.log('page manager:', location);
    // console.log(location.pathname.indexOf("/main"));
    // console.log("checkRoute: /main:", checkRoute("/main"));
    // console.log("checkRoute: /info:", checkRoute("/info"));


    actionAppTouchState(ETouchState.WAIT);
    actionAppVoiceState("");
    closeDialog();
    // setTimeoutRequest({
    //   id: 'action_wait',
    //   timeout: 15000,
    //   callback: () => {
    //     if (location.pathname !== "/voice") {
    //       navigate("/")
    //     }
    //   },
    // });

  }, [location]);

  return (
    <PageManagerContext.Provider value={{}}>
      {children}
    </PageManagerContext.Provider>
  );
}

export default PageManagerContext;