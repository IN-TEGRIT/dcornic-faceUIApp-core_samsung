import { ETouchState } from "../../Types/Input.d";

export interface IAppActionContext {
  actionWaitingTime: number,

  appTouchState: ETouchState,
  actionAppTouchState: (state: ETouchState) => void,
  
  appVoiceState: string,
  actionAppVoiceState: (state: string) => void,

  setTimeoutRequest: ({id, timeout, callback}: ITimeoutCallbackItem) => void,
}