/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useContext } from "react";

// Contexts
import { AppActionContext, AppModalContext, RosEventManagerContext } from "../../Contexts";

// CommonModule
import RequestFrameInterval from "../../Modules/RequestFrameInterval";

// Components
import UIAction from "./Components/UIAction/UIAction";
import UIAction2 from "./Components/UIAction/UIAction2";
import VoiceInputComp from "./Components/VoiceInput/VoiceInputComp";
import QRViewerComp from "./Components/QRViewer/QRViewerComp";

// Styles
import "./FacePage.scss";

// Resources
import videoList from "../../Resources/Face/Videos";
import * as UISounds from "../../Resources/Common/Sounds";

// Types
import { EFaceState, EVoiceState, EVoiceUIState } from "../../Types/Face.d";
import { ETouchState } from "../../Types/Input.d";

const FACE_STATE = {
  idle: 0,
  joy: 1,
  energetic: 2,
  surprise: 3,
  sad: 4,
  sleeping: 5,
  focus: 6, 
  anxiety: 7,
  slyness: 8,
  fury: 9,
};

export default function FacePage() {
  const DEFAULT_SHOWING_PHOTO_QR_TIME = 20000;
  const { 
    // requestFaceState,
    requestDisplayState,
    photoActionStateTopicValue, 
    setPhotoActionStateTopicValue 
  } = useContext(RosEventManagerContext);
  const { setTimeoutRequest } = useContext(AppActionContext);


  const [showingPhotoQR, setShowingPhotoQR] = useState(false);
  const [showingPhotoUploadingAlert, setShowingPhotoUploadingAlert] = useState(false);
  const [showingVoiceUI, setShowingVoiceUI] = useState(EVoiceUIState.NONE);

  const [faceState, setFaceState] = useState(EFaceState.IDLE_1);

  const { closeDialog } = useContext(AppModalContext);
  const { actionWaitingTime, appTouchState } = useContext(AppActionContext);
  const [audio, setAudio] = useState(new Audio());

  const facePlayerRef = useRef(null);
  const playIndex = useRef(0);
  const initPlay = useRef(false);

  const [muted, setMuted] = useState(true);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  const playVideo = (videoSrc) => {
    // console.log("play video");
    facePlayerRef.current.src = videoSrc;
    // bindEventListenerVideoEnd()
  };

  const playVideoList = (videoList) => {
    if (initPlay.current) return;
    initPlay.current = true;
    facePlayerRef.current.src = videoList[playIndex.current];
    facePlayerRef.current.onended = () => {
      console.log('video ended')
      if (playIndex.current + 1 >= videoList.length) {
        playIndex.current = 0;
      } else {
        playIndex.current += 1;
      }
      console.log('next video', playIndex.current, videoList.length);
      facePlayerRef.current.src = videoList[playIndex.current];
    }
  }


  useEffect(() => {
    // console.log(videoList);
    closeDialog();
    facePlayerRef.current.volume = 0.2;
    
    audio.autoplay = true;
    audio.volume = 1;

    if (process.env.REACT_APP_ROBOT_MODEL === "PLATY") {
      playVideo(videoList.idle3[0]);
    } else {
      playVideo(videoList.test[0]);
      // playVideoList(videoList.intro);
    }
    // playVideoList(videoList.idle2);
    // playVideo(videoList.idle[3]);
    // playVideo(videoList.idle3[0]);

    return () => {
      if (facePlayerRef?.current?.pause)
        facePlayerRef.current.pause();
    }
  }, []);

  useEffect(() => {
    // console.log('photoActionStateTopicValue: ', photoActionStateTopicValue);
    if (photoActionStateTopicValue === "shutter") {
      audio.src = UISounds.cameraShutter;
      setShowingPhotoQR(false);
      setPhotoActionStateTopicValue("uploading");
    } else if (photoActionStateTopicValue === "shutter_error_uploading") {
      setShowingPhotoUploadingAlert(true);
    }

    if ( photoActionStateTopicValue !== "" &&
        photoActionStateTopicValue !== "shutter" &&
        photoActionStateTopicValue !== "uploading" && 
        photoActionStateTopicValue !== "shutter_error_uploading"
    ) {
      setShowingPhotoUploadingAlert(false);
      setShowingPhotoQR(true);
      setTimeoutRequest({
        id: "close_photo",
        timeout: DEFAULT_SHOWING_PHOTO_QR_TIME,
        callback: () => {
          setPhotoActionStateTopicValue("");
          setShowingPhotoQR(false);
        }
      });
    } 
    
    // if (appTouchState === ETouchState.TOUCH_QUINTUPLE_TAP) {
    if (appTouchState === ETouchState.TOUCH_DOUBLE_TAP){
      setShowingVoiceUI(EVoiceUIState.VOICE_UI);
    } else {
      setShowingVoiceUI(EVoiceUIState.NONE);
    }

  }, [appTouchState, photoActionStateTopicValue]);

  // useEffect(() => {
  //   if (actionWaitingTime >= 15000) {
  //     setShowingVoiceUI(EVoiceUIState.NONE);
  //   }
  // }, [actionWaitingTime]);
  
  useEffect(() => {
    // if (
    //   requestDisplayState.value === FACE_STATE.idle 
    // ) {
    //   playVideo(videoList.emotion[FACE_STATE.idle])
    //   // indexRef.current = 0;  // 인덱스 초기화
    //   // setSttMessage(stt);
    // } else if (requestDisplayState.value === FACE_STATE.joy) {
    //   playVideo(videoList.emotion[FACE_STATE.joy])
    // } else if (requestDisplayState.value === FACE_STATE.surprise) {
    //   // setTtsMessage(tts);
    //   playVideo(videoList.emotion[FACE_STATE.surprise])
    // } 

    playVideo(videoList.emotion[requestDisplayState.value])

    }, [requestDisplayState.value]);


  const renderElement = () => {
    let renderingFaceElement = <></>;
    let renderingVoiceElement = <></>;
    if (faceState === EFaceState.NONE) {
      renderingFaceElement = <></>;
      renderingVoiceElement = <></>;
    } else {
      if (showingVoiceUI === EVoiceUIState.VOICE_UI) {
        renderingVoiceElement = <VoiceInputComp />
      }
      // if (showingPhotoQR) {
      //   renderingVoiceElement =
      //     <QRViewerComp
      //       url={photoActionStateTopicValue}
      //       closeHandler={() => {
      //         setPhotoActionStateTopicValue("");
      //         setShowingPhotoQR(false);
      //       }}
      //     />
      // }
      renderingFaceElement =
        <video
          id="face-player"
          ref={facePlayerRef}
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          playsInline
          autoPlay
          muted
          loop
          // controls
        />
    }

    return (
      <>
        {renderingFaceElement}
        {renderingVoiceElement}
      </>
    )
  }

  const renderStatusBar = () => {
    return (
      <div className="status-bar">
        {
          photoActionStateTopicValue === "uploading" &&
          <div className="icon-wrapper animate__fadeInLeft animate__animated animate__fast">
            <i className="uploading"></i>
          </div>
        }
        {
          photoActionStateTopicValue !== "" &&
          photoActionStateTopicValue !== "shutter" &&
          photoActionStateTopicValue !== "uploading" && 
          photoActionStateTopicValue !== "shutter_error_uploading" &&
          <div className="icon-wrapper animate__fadeOutLeft animate__animated animate__fast animate__delay-1s">
            <i className="uploading"></i>
          </div>
        }
      </div>
    )
  }

  return (
    <div id="face-page" className="page">
      {renderElement()}
      {renderStatusBar()}
      { muted &&
        <div id="btn-unmuted" onClick={()=>{
          if(facePlayerRef?.current?.muted) {
            facePlayerRef.current.muted = false;
            setMuted(false);
          }
        }}></div>
      }
      {showingPhotoUploadingAlert && <div className="toast">이전 촬영 사진을 업로드 중입니다.</div>}
      {/* { faceState.voiceInput && <div className="img-input-voice type-2" /> } */}
      {/* { faceState.voiceInput && <div className="img-input-voice type-3" /> } */}
      {/* { faceState.voiceInput && <div className="img-input-voice type-4" /> } */}

    </div>
  );
}
