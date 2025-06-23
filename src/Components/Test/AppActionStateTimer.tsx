import { useContext } from "react"
import { AppActionContext } from "../../Contexts"
import "./AppActionStateTimer.scss";

export default function AppActionStateTimer() {
  const { actionWaitingTime } = useContext(AppActionContext);
  return (
    <div id="app-action-state-time">
      {actionWaitingTime}
    </div>
  )
}