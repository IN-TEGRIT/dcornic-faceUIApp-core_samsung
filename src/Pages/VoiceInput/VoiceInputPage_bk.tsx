import { useState, useContext, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AppActionContext,
  AppModalContext,
  RosEventManagerContext,
} from "../../Contexts";

import videoList from "../../Resources/Face/Videos";

// import imgVoiceAnimation from "../../Resources/Face/Images/img-waiting-voice-input-1.gif";
import { ETouchState } from "../../Types/Input.d";

import "./VoiceInputPage.scss";

const VOICE_STATE = {
  idle: "IDLE",
  wakeup: "WAKEUP",
  listening: "LISTENING",
  finish: "FINISH",
};

const TTS_ANIMATION_TIME_MS = 1050;
const TTS_ANIMATION_TIME_RATIO = 0.5;

export default function VoiceInputPage() {
  const { voiceActionStateTopicValue, voiceTalkingInfoTopicValue } = useContext(
    RosEventManagerContext
  );
  let savedInputText = useRef("");
  const navigate = useNavigate();
  const { appTouchState } = useContext(AppActionContext);
  const { confirmDialog, closeDialog } = useContext(AppModalContext);
  const { setTimeoutRequest } = useContext(AppActionContext);


  const calcTtsLines = (text: string) => {
    const lines = text.length / 21;
    // console.log(text.length, lines);
    return lines;
  }
  const calcTtsAnimationTime = (text: string) => {
    const words = text.split(' ');
    console.log('words:', words);
    return words.length * TTS_ANIMATION_TIME_MS;
  }

  useEffect(() => {
    setTimeoutRequest({
      id: "voice_input",
      timeout: 5000,
      // callback: () => {
      //   console.log('end speaking');
      // }
      callback: () => navigate("/"),
    });
  }, []);

  useEffect(() => {
    if (appTouchState === ETouchState.TOUCH_DOUBLE_TAP) {
      confirmDialog({
        contents: "음성 입력을 취소할까요?",
        onOk: () => {
          console.log("cancel voice input");
          navigate("/");
        },
      });
    }
  }, [appTouchState]);

  const stateCheckSpeaking_NoneTTS = () => {
      setTimeoutRequest({
        id: "voice_input",
        timeout: 2000,
        callback: () => {
          console.log("stateCheckSpeaking_NoneTTS");
          if (voiceActionStateTopicValue === "speaking") {
            stateCheckSpeaking_NoneTTS();   
          } else {
            navigate("/");
          }
        }
      });
  }

  useEffect(() => {
    // if (!voiceTalkingInfoTopicValue?.tts || !voiceTalkingInfoTopicValue?.stt)
    //   return;
    const { stt, tts } = voiceTalkingInfoTopicValue;
    stt && console.log("voiceinput:", stt);
    tts && console.log("voiceoutput", tts);
    if (
      voiceActionStateTopicValue === "listening" ||
      voiceActionStateTopicValue === "loading"
    ) {
      // setSttMessage(stt);
    } else if (voiceActionStateTopicValue === "speaking") {
      // setTtsMessage(tts);
    
      const speakingTime = calcTtsAnimationTime(tts);
      // console.log('speakingTime:', speakingTime * TTS_ANIMATION_TIME_RATIO + 3500);
      if (tts === "") {
        console.log("TTS TEST CASE 1");
        stateCheckSpeaking_NoneTTS();
      } else if (calcTtsLines(tts) <= 4) {
        console.log("TTS TEST CASE 2");
        // 라인수가 4줄 아래면 정지된 자막 출력후 2초후 페이지 넘김
        // 라인수가 많으면 흐르는 시간 보정을 위해 TTS_ANIMATION_TIME_RATIO를 곱해 자막이 빠르게 흐르게함
        setTimeoutRequest({
          id: "voice_input",
          timeout: speakingTime + 2000,
          // callback: () => {
          //   console.log('end speaking');
          // }
          callback: () => navigate("/"),
        });
      } else {
        console.log("TTS TEST CASE 3");
        setTimeoutRequest({
          id: "voice_input",
          timeout: speakingTime * TTS_ANIMATION_TIME_RATIO + 3500,
          // callback: () => {
          //   console.log('end speaking');
          // }
          callback: () => navigate("/"),
        });
      }
    } else if (voiceActionStateTopicValue === "finish") {
      navigate("/");
      setTimeoutRequest({
        id: "voice_input",
        callback: () => {},
      })
    }
  }, [voiceActionStateTopicValue, voiceTalkingInfoTopicValue]);

  const { stt, tts } = voiceTalkingInfoTopicValue;


  return (
    <>
      <div id="voice-input-full-page" className="page">
        {/* <img className="bg" src={imgVoiceAnimation} /> */}
        <video id="video-speaking" loop playsInline autoPlay muted >
          <source src={videoList.speaking[0]}
            type="video/mp4" />
        </video>

        {((voiceActionStateTopicValue === "listening" ||
          voiceActionStateTopicValue === "loading") && stt && stt.length !== 0 && stt !== "") && (
          <div className="text-area LISTENING">{stt}</div>
        )}

        {voiceActionStateTopicValue === "speaking" && tts && (
          <div className="text-area">
            {calcTtsLines(tts) <= 4 ? 
              <p className="top">{tts || ''}</p> :
              <p style={{animationDuration: `${calcTtsAnimationTime(tts) * TTS_ANIMATION_TIME_RATIO}ms`}}>{tts || ''}</p>
            }
          </div>
        )}
      </div>
    </>
  );
}
