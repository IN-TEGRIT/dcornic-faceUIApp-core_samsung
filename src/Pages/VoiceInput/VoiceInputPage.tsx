import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  listening: 11,
  thinking: 12,
  speaking: 13,
  idle: 0,
  //welcome: 101,
};
// const VOICE_STATE = {
//   idle: "IDLE",
//   wakeup: "WAKEUP",
//   listening: "LISTENING",
//   finish: "FINISH",
// };

const TTS_ANIMATION_TIME_MS = 1050;
const TTS_ANIMATION_TIME_RATIO = 0.5;

export default function VoiceInputPage() {
  const { 
    voiceActionStateTopicValue, 
    voiceTalkingInfoTopicValue,

    // 로봇 음성인식
    requestDisplayState,
    voiceTalkingInfoTopicTTS
  } = useContext(
    RosEventManagerContext
  );
  let savedInputText = useRef("");
  const indexRef = useRef(0); // index를 useRef로 관리

  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const { appTouchState } = useContext(AppActionContext);
  const { confirmDialog, closeDialog } = useContext(AppModalContext);
  const { setTimeoutRequest } = useContext(AppActionContext);
  const voicePlayerRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  const playVideo = (videoSrc: any) => {
    // console.log("play video");
    if(voicePlayerRef.current){
      voicePlayerRef.current.src = videoSrc;
      voicePlayerRef.current.muted = false;  // 비디오 소리를 켜기
      voicePlayerRef.current.play();         // 비디오 재생
    }
    // bindEventListenerVideoEnd()
  };

  // useEffect(() => {
  //   setTimeoutRequest({
  //     id: "voice_input",
  //     timeout: 5000,
  //     // callback: () => {
  //     //   console.log('end speaking');
  //     // }
  //     callback: () => navigate("/"),
  //   });
  // }, []);

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

  // const stateCheckSpeaking_NoneTTS = () => {
  //     setTimeoutRequest({
  //       id: "voice_input",
  //       timeout: 2000,
  //       callback: () => {
  //         console.log("stateCheckSpeaking_NoneTTS");
  //         if (voiceActionStateTopicValue === "speaking") {
  //           stateCheckSpeaking_NoneTTS();   
  //         } else {
  //           navigate("/");
  //         }
  //       }
  //     });
  // }

  useEffect(() => {
    let index = 0; // 인덱스 초기화
    let startTime = performance.now(); // 타이머를 기준으로 시작 시간 설정
    let animationFrame: number;

    // 초기화
    setDisplayedText(''); // 초기값 설정

    const typeLetter = (currentTime : number) => {
      if (currentTime - startTime >= 115) { // speed 간격마다 텍스트를 한 글자씩 추가
        if (index < voiceTalkingInfoTopicTTS.length) { // index가 범위 내에 있을 때만 추가
          // index를 먼저 증가시키고, 그 후에 setDisplayedText 호출
          const currentChar = voiceTalkingInfoTopicTTS[index];
          index++;
          setDisplayedText((prev) => prev + currentChar); // 글자 추가
        }
        startTime = currentTime; // 다음 글자 타이핑을 위해 시간 갱신
      }

      if (index < voiceTalkingInfoTopicTTS.length) {
        animationFrame = requestAnimationFrame(typeLetter); // 다음 글자 타이핑 예약
      } else { 
        setTimeout(() => {

        }, 500)
      }
    };
    // if (!voiceTalkingInfoTopicValue?.tts || !voiceTalkingInfoTopicValue?.stt)
    //   return;
    // const { stt, tts } = voiceTalkingInfoTopicValue;
    // stt && console.log("voiceinput:", stt);
    // tts && console.log("voiceoutput", tts);

    voiceTalkingInfoTopicTTS && console.log("voiceoutput", voiceTalkingInfoTopicTTS);

    if (
      requestDisplayState.value === VOICE_STATE.listening 
      // voiceActionStateTopicValue === "listening" ||
      // voiceActionStateTopicValue === "loading"
    ) {
      playVideo(videoList.listening)
      setDisplayedText(() => ""); // 기존 텍스트 지우기
      indexRef.current = 0;  // 인덱스 초기화
      // setSttMessage(stt);
    } else if (requestDisplayState.value === VOICE_STATE.thinking) {
      playVideo(videoList.thinking)
    } else if (requestDisplayState.value === VOICE_STATE.speaking) {
      // setTtsMessage(tts);
      
      playVideo(videoList.speaking)
      
      // 첫 타이핑 시작
    animationFrame = requestAnimationFrame(typeLetter);
      /* const intervalId = setInterval(() => {
        // `indexRef.current`가 배열의 길이를 초과하지 않도록 체크
        if (indexRef.current < voiceTalkingInfoTopicTTS.length) {
          const currentChar = voiceTalkingInfoTopicTTS[indexRef.current];
          
          // 상태 업데이트가 제대로 동기화되도록 이전 상태 기반으로 값을 업데이트
          setDisplayedText((prev) => prev + currentChar);
          
          // `indexRef.current`를 증가
          indexRef.current += 1;
        } else {
          clearInterval(intervalId);  // 배열을 초과하면 타이핑 종료
          setDisplayedText(() => ""); // 기존 텍스트 지우기
          // setTimeout(() => {
          //   setDisplayedText("");  // 텍스트 초기화
          //   indexRef.current = 0;  // 인덱스 초기화
          // }, 500); // 효과 반복을 원할 경우 딜레이 추가
        }
      }, 115); */

      // 컴포넌트가 언마운트되면 타이핑 타이머 정리
      //return () => clearInterval(intervalId);
      
      // 클린업: 새 텍스트가 들어오거나 컴포넌트가 언마운트될 때 애니메이션 중단
    return () => cancelAnimationFrame(animationFrame);
      // const speakingTime = calcTtsAnimationTime(voiceTalkingInfoTopicTTS);
      // // console.log('speakingTime:', speakingTime * TTS_ANIMATION_TIME_RATIO + 3500);
      // if (voiceTalkingInfoTopicTTS === "") {
      //   console.log("TTS TEST CASE 1");
      //   stateCheckSpeaking_NoneTTS();
      // } else if (calcTtsLines(voiceTalkingInfoTopicTTS) <= 4) {
      //   console.log("TTS TEST CASE 2");
      //   // 라인수가 4줄 아래면 정지된 자막 출력후 2초후 페이지 넘김
      //   // 라인수가 많으면 흐르는 시간 보정을 위해 TTS_ANIMATION_TIME_RATIO를 곱해 자막이 빠르게 흐르게함
      //   setTimeoutRequest({
      //     id: "voice_input",
      //     timeout: speakingTime + 2000,
      //     // callback: () => {
      //     //   console.log('end speaking');
      //     // }
      //     callback: () => navigate("/"),
      //   });
      // } else {
      //   console.log("TTS TEST CASE 3");
      //   setTimeoutRequest({
      //     id: "voice_input",
      //     timeout: speakingTime * TTS_ANIMATION_TIME_RATIO + 3500,
      //     // callback: () => {
      //     //   console.log('end speaking');
      //     // }
      //     callback: () => navigate("/"),
      //   });
      // }
    } else if(requestDisplayState.value === VOICE_STATE.idle){
        navigate("/")
      }
    }, [requestDisplayState.value, voiceTalkingInfoTopicTTS]);
    // {
    //   playVideo(videoList.listening)
    //   setDisplayedText(""); // 기존 텍스트 지우기
    //   indexRef.current = 0;  // 인덱스 초기화
    //   // setSttMessage(stt);
    // } else if (voiceActionStateTopicValue === "speaking") {
    //   // setTtsMessage(tts);
    
    //   const speakingTime = calcTtsAnimationTime(tts);
    //   // console.log('speakingTime:', speakingTime * TTS_ANIMATION_TIME_RATIO + 3500);
    //   if (tts === "") {
    //     console.log("TTS TEST CASE 1");
    //     stateCheckSpeaking_NoneTTS();
    //   } else if (calcTtsLines(tts) <= 4) {
    //     console.log("TTS TEST CASE 2");
    //     // 라인수가 4줄 아래면 정지된 자막 출력후 2초후 페이지 넘김
    //     // 라인수가 많으면 흐르는 시간 보정을 위해 TTS_ANIMATION_TIME_RATIO를 곱해 자막이 빠르게 흐르게함
    //     setTimeoutRequest({
    //       id: "voice_input",
    //       timeout: speakingTime + 2000,
    //       // callback: () => {
    //       //   console.log('end speaking');
    //       // }
    //       callback: () => navigate("/"),
    //     });
    //   } else {
    //     console.log("TTS TEST CASE 3");
    //     setTimeoutRequest({
    //       id: "voice_input",
    //       timeout: speakingTime * TTS_ANIMATION_TIME_RATIO + 3500,
    //       // callback: () => {
    //       //   console.log('end speaking');
    //       // }
    //       callback: () => navigate("/"),
    //     });
    //   }
    // } else if (voiceActionStateTopicValue === "finish") {
    //   navigate("/");
    //   setTimeoutRequest({
    //     id: "voice_input",
    //     callback: () => {},
    //   })
    // }
    
  // }, [voiceActionStateTopicValue, voiceTalkingInfoTopicValue]);

  const { stt, tts } = voiceTalkingInfoTopicValue;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedText]);  // displayedText가 변경될 때마다 실행

  return (
    <>
      <div id="voice-input-full-page" className="page">
        {/* <img className="bg" src={imgVoiceAnimation} /> */}
        <video 
          id="video-speaking" 
          ref={voicePlayerRef} 
          loop 
          playsInline 
          autoPlay 
          muted 
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          >
          {/* <source src={videoList.speaking[0]} */}
          <source src={videoList.thinking[0]}
            type="video/mp4" />
        </video>

        {/* {((voiceActionStateTopicValue === "listening" ||
          voiceActionStateTopicValue === "loading") && stt && stt.length !== 0 && stt !== "") && (
          <div className="text-area LISTENING">{stt}</div>
        )} */}

        {requestDisplayState.value === VOICE_STATE.speaking && voiceTalkingInfoTopicTTS && (
          <div className="text-area" ref={scrollRef}>
            <p className="top">{displayedText}</p>
            {/* <span className="cursor">|</span> */}
            {/* {calcTtsLines(voiceTalkingInfoTopicTTS) <= 4 ? 
              <p className="top">{voiceTalkingInfoTopicTTS || ''}</p> :
              } */}
            <p style={{animationDuration: `${calcTtsAnimationTime(voiceTalkingInfoTopicTTS) * TTS_ANIMATION_TIME_RATIO}ms`, display: 'none'}}>{voiceTalkingInfoTopicTTS || ''}</p>
          </div>
        )}

        {/* {voiceActionStateTopicValue === "speaking" && tts && (
          <div className="text-area">
            {calcTtsLines(tts) <= 4 ? 
              <p className="top">{tts || ''}</p> :
              <p style={{animationDuration: `${calcTtsAnimationTime(tts) * TTS_ANIMATION_TIME_RATIO}ms`}}>{tts || ''}</p>
            }
          </div>
        )} */}
      </div>
    </>
  );
}
