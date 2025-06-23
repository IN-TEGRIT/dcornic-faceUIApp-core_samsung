/*
 * App.tsx 와 Layer들 간의 이벤트 및 데이터 처리를 위한 Context 입니다.
 */

import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Contexts

// Utils

// Types
import { IAppActionContext } from './AppActionContext.d';
import { ETouchState } from "../../Types/Input.d";
import RosEventManagerContext from "../Ros/RosEventManagerContext";
// import { IAppTouchContext } from './AppTouchContext.d';

type MilliSeconds = number;

const AppActionContext = React.createContext<IAppActionContext>({
  actionWaitingTime: 0,

  appTouchState: ETouchState.WAIT,
  actionAppTouchState: (_state: ETouchState) => {},

  appVoiceState: "",
  actionAppVoiceState: (_state: string) => {},

  setTimeoutRequest: ({id, timeout, callback}: ITimeoutCallbackItemParams) => {},
});

interface ITimeoutCallbackItemParams {
  id: string;
  timeout: number;
  callback: () => void
}
interface ITimeoutCallbackItem {
  id: string;
  callbackRunTime: number;
  callback: () => void
}

const DEFAULT_ACTION_WAIT_TIME_MS = 15000;

export function AppActionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let location = useLocation();
  let navigate = useNavigate();
  const [actionWaitingTime, setActionWaitingTime] = useState(0);
  const { publishTopic } = useContext(RosEventManagerContext);

  const startedCheckLoop = useRef(false);

  const timeoutCallbackList = useRef<ITimeoutCallbackItem[]>([]);
  const requestAnimRef = useRef<any>(null);

  const [appTouchState, setAppTouchState] = useState<ETouchState>(
    ETouchState.WAIT
  );
  const [appVoiceState, setAppVoiceState] = useState<string>("")

  const setTimeoutRequest = ({id, timeout, callback}: ITimeoutCallbackItemParams) => {
    const containIndex = timeoutCallbackList.current.findIndex( k => k.id === id);
    // console.log('containIndex:', containIndex);
    // console.log(id);
    // console.log(timeout);
    // console.log(callback);
    if (containIndex !== -1) {
      /* overwrite */
      const containItem = timeoutCallbackList.current[containIndex];
      containItem.callbackRunTime = Date.now() + timeout;
      containItem.callback = callback;

      timeoutCallbackList.current.splice(containIndex, 1, containItem);
    } else {
      const newItems = timeoutCallbackList.current;
      newItems.push({
        id,
        callbackRunTime: Date.now() + timeout,
        callback,
      });

      timeoutCallbackList.current = newItems;
    }
  }

  const checkActionLoop = (_timestamp: any) => {
    const timeoutedItems = timeoutCallbackList.current.filter( k => k.callbackRunTime <= Date.now() );
    const updateItems = timeoutCallbackList.current.filter( k => k.callbackRunTime > Date.now() );

    timeoutedItems.forEach(({ callback }) => callback());

    timeoutCallbackList.current = updateItems;

    requestAnimRef.current = requestAnimationFrame(checkActionLoop);
  }

  const actionAppTouchState = (touchAction: ETouchState) => {
    console.log('actionAppTouchState:', touchAction);
    setAppTouchState(() => touchAction);
    // updateLastActionTime();
    setTimeoutRequest({
      id: 'action_wait',
      timeout: 15000,
      callback: () => {
        setAppTouchState(() => ETouchState.WAIT);
        if (location.pathname !== "/voice") {
          navigate("/")
          publishTopic("activated_ui_head", false)
        }
      }
    });
    
  }

  const actionAppVoiceState = (voiceState: string) => {
    setAppVoiceState(voiceState);
  }

  useEffect(() => {
    // RequestFrameInterval.addInterval(touchcheckActionLoop, "AppContext", 1000 / 30);
    if (!startedCheckLoop.current) {
      requestAnimRef.current = requestAnimationFrame(checkActionLoop);
      startedCheckLoop.current = true;
    }
  }, [startedCheckLoop]);

  return (
    <AppActionContext.Provider
      value={{
        actionWaitingTime,
        appTouchState,
        actionAppTouchState,

        appVoiceState,
        actionAppVoiceState,

        setTimeoutRequest,
      }}
    >
      {children}
    </AppActionContext.Provider>
  );
}

export default AppActionContext;
