import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppActionContext, AppModalContext, RosEventManagerContext } from "../../Contexts";
import { useEventListener } from "../../Hooks/useEventListener";

//Types
import { ETouchAction, ETouchState } from "../../Types/Input.d";



export default function AppTouchEffectLayer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { actionAppTouchState, setTimeoutRequest } = useContext(AppActionContext);
  const { topicList, publishTopic } = useContext(RosEventManagerContext);
  const [touchAction, setTouchAction] = useState(ETouchAction.IDLE);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  // const [lastTouchEndTime, setLastTouchEndTime] = useState(0);
   const [appTouchState, setAppTouchState] = useState<ETouchState>(
      ETouchState.WAIT
    );
  const lastTouchEndTime = useRef(0);
  const tapCount = useRef(0);

  let endX = useRef(0);
  let endY = useRef(0);

  const onTouchStart = useCallback(({ touches }: { touches: TouchList }) => {
    // console.log('touchStart', touches);
    if (touches && touches[0]) {
      console.log("touchStart");
      const { clientX, clientY }: { clientX: number; clientY: number } =
        touches[0];
      setCoords({ x: clientX, y: clientY });
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
    //   if(topicList.length > 0){
    //     publishTopic("activated_ui", true);

    //     setTimeoutRequest({
    //       id: "home_return",
    //       timeout: 15000,
    //       callback: () => {
    //         console.log("Home return")
    //         // navigate("/");
    //         publishTopic("activated_ui", false);
    //         /* console.log("stateCheckSpeaking_NoneTTS");
    //         if (voiceActionStateTopicValue === "speaking") {
    //           stateCheckSpeaking_NoneTTS();   
    //         } else {
    //           navigate("/");
    //         } */
    //       }
    //     });
    // }
      setTouchAction(ETouchAction.TOUCH_START);
    }
  }, []);

  const onTouchEnd = useCallback(({ touches }: { touches: TouchList }) => {
    // console.log("touchEnd", lastTouchEndTime, Date.now());
    // console.log(Date.now() - lastTouchEndTime.current);

    const currentTime = Date.now();

    if (currentTime - lastTouchEndTime.current < 500) {
      tapCount.current += 1;
      //actionAppTouchState(ETouchState.TOUCH_DOUBLE_TAP);
    } else {
      tapCount.current = 1
    }
    
    if(tapCount.current >= 2){
      actionAppTouchState(ETouchState.TOUCH_DOUBLE_TAP)// Trigger 5 taps state
      tapCount.current = 0; // Reset the counter after 5 taps
    }

    // if(tapCount.current >= 5) {
    //   actionAppTouchState(ETouchState.TOUCH_QUINTUPLE_TAP); // Trigger 5 taps state
    //   tapCount.current = 0; // Reset the counter after 5 taps
    // }

    else {
      console.log(!(location.pathname === "/" && ETouchState.TOUCH_DOUBLE_TAP));
      if (!(location.pathname === "/" && ETouchState.TOUCH_DOUBLE_TAP)) {
        actionAppTouchState(ETouchState.TOUCH_ONE_TAP);
      }
    }

    setTouchAction(ETouchAction.TOUCH_END);
    lastTouchEndTime.current = Date.now();
  }, []);

  const onTouchMove = useCallback(({ touches }: { touches: TouchList }) => {
    if (touches && touches[0]) {
      console.log("touchMove");
      const { clientX, clientY }: { clientX: number; clientY: number } =
        touches[0];
      setCoords({ x: clientX, y: clientY });
      setTouchAction(ETouchAction.TOUCH_MOVE);
    }
  }, []);



  useEventListener("touchmove", onTouchMove, document);
  useEventListener("touchstart", onTouchStart, document);
  useEventListener("touchend", onTouchEnd, document);
  // useEventListener("mouseenter", onMouseEnter, document);
  // useEventListener("mouseleave", onMouseLeave, document);



  return <></>;
}
