/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useRef, useEffect, useContext } from "react";
import { cloneDeep } from "lodash";
import ROSLIB from "roslib";

import { createTopicObject } from "./RosUtil";
import { useNavigate } from "react-router-dom";
import AppActionContext from "../AppActionContext/AppActionContext";

type TRosTopicType = "pub" | "sub";

interface IRosTopic {
  name: string;
  topicObj: any;
  type: TRosTopicType;
  callback?: (msg: any) => void;
}

type TRosTopicList = IRosTopic[];

const INIT_STEP_ROS = {
  NONE: 0,
  CREATED_ROS_INSTANCE: 1,
  CONNECTED: 2,
  CREATED_TOPIC: 3,
  REGISTED_SUBSCRIBED: 4,
};

const VOICE_STATE = {
  listening: 11,
  thinking: 12,
  speaking: 13,
  idle: 3,
  //welcome: 101,
};

interface IRosEventManagerContext {
  rosInstance: ROSLIB.Ros;
  topicList: TRosTopicList;

  robotLocationID: number;

  voiceActionStateTopicValue: string;
  setVoiceActionStateTopicValue: (state: string) => void;

  voiceTalkingInfoTopicTTS: string;

  voiceTalkingInfoTopicValue: {
    tts: string,
    stt: string,
    intent: string,
    emotion: string,
    speakingTime?: number,
  };
  setVoiceTalkingInfoTopicValue: (state: any) => void;

  photoActionStateTopicValue: string;
  setPhotoActionStateTopicValue: (state: string) => void;

  publishTopic: (cmd: string, param?: any) => void;

  // requestFaceState: {
  //   time: number;
  //   value: number;
  // };

  requestDisplayState: {
    time: number;
    value: number;
  }
}

const DEFAULT_CONNECT_ADDRESS = "192.168.10.15:9090";

const RosEventManagerContext = React.createContext<IRosEventManagerContext>({
  rosInstance: new ROSLIB.Ros({}),
  topicList: [],

  robotLocationID: 1,

  voiceTalkingInfoTopicTTS: "",

  voiceActionStateTopicValue: "",
  setVoiceActionStateTopicValue: (state) => {},

  voiceTalkingInfoTopicValue: { tts: "", stt: "", intent: "", emotion: "", speakingTime: 0 },
  setVoiceTalkingInfoTopicValue: (state) => {},

  photoActionStateTopicValue: "",
  setPhotoActionStateTopicValue: (params) => {},

  publishTopic: (cmd, param) => {},

  // requestFaceState: {
  //   time: 0,
  //   value: 0,
  // },

  requestDisplayState: {
    time: 0,
    value: 0,
  },
});

export function RosEventManagerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let initedInst = false;
  let topicListRef = useRef<TRosTopicList>([]);
  let intervalReconnect = useRef<any>(null);

  let navigate = useNavigate();
  const [initializeStep, setInitializeStep] = useState(INIT_STEP_ROS.NONE);

  const [connected, setConnected] = useState(false);

  const [timerRobotPosTest, setTimerRobotPosTest] = useState<any>(null);
  const [robotLocationID, setRobotLocationID] = useState(1);

  // const [rosInstance, setRosInstance] = useState<any>(null);
  const rosInstance = useRef<ROSLIB.Ros>(new ROSLIB.Ros({}));
  const [rosTopicList, setRosTopicList] = useState<TRosTopicList>([]);

  const [connectedAddress, setConnectedAddress] = useState("");

  const [requestChangeAddress, setRequestChangeAddress] = useState<
    string | null
  >(null);
  const [requestReconnect] = useState(false);

  const [pending, setPending] = useState(false);
  // const [robotPosTest, setRobotPosTest] = useState({x: 0, y: 0});

  // const [requestFaceState, setRequestFaceState] = useState({time: 0, value: 0});
  const [requestDisplayState, setRequestDisplayState] = useState({time: 0, value: 0});
  const [voiceTalkingInfoTopicTTS, setVoiceTalkingInfoTopicTTS] = useState("")
  // Subscribed Datas
  const [voiceActionStateTopicValue, setVoiceActionStateTopicValue] =
    useState("");
  const [voiceTalkingInfoTopicValue, setVoiceTalkingInfoTopicValue] =
    useState({ tts: "", stt: "", intent: "", emotion: "", speakingTime: 0 });


  const [photoActionStateTopicValue, setPhotoActionStateTopicValue] = useState("");

  //
  const { setTimeoutRequest, actionAppVoiceState } = useContext(AppActionContext);

  /*
   * ROS 관련
   */

  const deleteItem = (list: any[], index: number, count: number = 1) => {
    const newList = cloneDeep(list);
    newList.splice(index, count);

    return newList;
  };

  const addTopic = (name: string, type: TRosTopicType, topicObj: any) => {
    const containIndex = rosTopicList.findIndex((k) => k.name === name);

    // contain = update
    // not contain = new
    if (containIndex !== -1) {
      console.log("already has topic", name);
    }

    const newList = cloneDeep(rosTopicList);

    newList.push({ name, type, topicObj });


    topicListRef.current = newList;
  };

  const removeTopic = (name: string) => {
    const containIndex = rosTopicList.findIndex((k) => k.name === name);

    deleteItem(rosTopicList, containIndex);
  };

  const subscribe = (topicType: { name: string; messageType: string }) => {
    const topicObj = createTopicObject(rosInstance.current, topicType);
    console.log(topicType);
  };

  const unsubscribe = (name: string) => {

    const rosTopic = rosTopicList.find((k) => k.name === name);

    if (rosTopic?.topicObj) {
      const { topicObj } = rosTopic;

      if (topicObj?.unsubscribe) {
        topicObj.unsubscribe(name);
      }
    }
  };

  const unsubscribeAll = () => {};

  const connect = (address: string) => {
    if (!rosInstance?.current?.connect) return;
    if (connected) return;
    // ROS Bridge 가 늦게 뜨는 경우가 있어 timeout을 줌
    setTimeout(() => {
      rosInstance.current.connect(`ws://${address}`);
    }, 20000)

  };

  const reconnect = (address: string) => {
    console.log(rosInstance.current);
    if (!rosInstance?.current?.connect) return;
    if (connected) return;
    rosInstance.current.connect(`ws://${address}`);
  };

  const disconnect = () => {
    unsubscribeAll();
    if (rosInstance) {
      if (rosInstance.current.close) {
        rosInstance.current.close();
      }
    }
  };

  const onRosConnection = (result: any) => {
    console.log("ros connected", result);

    if (intervalReconnect.current) {
      clearInterval(intervalReconnect.current);
      intervalReconnect.current = null;
    }
    setRequestChangeAddress("");
    setInitializeStep(INIT_STEP_ROS.CONNECTED);
  };

  const onRosClose = () => {
    console.log("closed ros connection");
    setInitializeStep(INIT_STEP_ROS.CREATED_ROS_INSTANCE);
    actionAppVoiceState("");
    if (requestChangeAddress && requestChangeAddress !== "") {
      console.log("ros close connection _ connect new address");
      // intervalReconnect.current = setInterval(() => {
      //   console.log("try connect new address");
        reconnect(requestChangeAddress);
      // }, 5000);
    } else {
      console.log("ros close connection _ reconnect");
      // intervalReconnect.current = setInterval(() => {
      //   console.log("retry connect");
        reconnect(DEFAULT_CONNECT_ADDRESS);
      // }, 5000);
    }
  };

  const onRosError = (err: string) => {
    console.log("video viewer widget _ connection error");
    console.log(err);
  };

  const initRosInstance = () => {
    if (initializeStep !== INIT_STEP_ROS.NONE) return;
    if (initedInst) return;

    initedInst = true;
    // const rosInst = new ROSLIB.Ros({});

    rosInstance.current.on("connection", onRosConnection);
    rosInstance.current.on("close", onRosClose);
    rosInstance.current.on("error", onRosError);

    // console.log(rosInst);
    // rosInstance.current = rosInst;
    // setRosInstance(() => rosInst);
    setInitializeStep(INIT_STEP_ROS.CREATED_ROS_INSTANCE);
  };

  const robotPoseTest = () => {
    const timer = setInterval(() => {
      // setRobotPosTest({x: 0, y: 0});
      const randomLocationID = Math.floor(Math.random() * 12) + 1;
      setRobotLocationID(randomLocationID);
    }, 10000);

    setTimerRobotPosTest(timer);
  };

  const publishTopic = (cmd: string, param?: any) => {
    console.log('publishTopic:', rosTopicList, cmd);
    const topicObj = rosTopicList.find(
      (k) => k.name === cmd
    )?.topicObj;
    console.log('publishTopic', topicObj);
    if (!topicObj) return;
    let msg;
    if (param) {
      msg = new ROSLIB.Message({
        data: param,
      });
    } else {
      new ROSLIB.Message({});
    }

    topicObj.publish(msg);
  }

  useEffect(() => {
    return () => {
      if (timerRobotPosTest) {
        clearInterval(timerRobotPosTest);
      }
    };
  }, []);

  useEffect(() => {
    switch (initializeStep) {
      case INIT_STEP_ROS.NONE:
        initRosInstance();
        break;
      case INIT_STEP_ROS.CREATED_ROS_INSTANCE:
        connect(DEFAULT_CONNECT_ADDRESS);
        break;
      case INIT_STEP_ROS.CONNECTED:
        const topic_voiceActionState = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/voice_action_state",
          messageType: "std_msgs/String",
        });

        const topic_voiceTalkingInfo = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/voice_talking_info",
          messageType: "std_msgs/String",
        });

        const topic_drivePassPoint = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/drive_pass_point",
          messageType: "std_msgs/String",
        });

        const topic_startDriving = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/start_driving",
          messageType: "std_msgs/String",
        });

        const topic_faceActionState = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/face_action_state",
          messageType: "std_msgs/String",
        });

        const topic_requestShutterSound = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/request_shutter_sound",
          messageType: "std_msgs/Empty",
        })

        const topic_selfCamUrl = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/self_cam_url",
          messageType: "std_msgs/String",
        });

        const topic_gpt_settings = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/robot_assistant/gpt/settings",
          messageType: "std_msgs/String",
        });

        /* 지울 예정 */
        // const topic_face_settings = new ROSLIB.Topic({
        //   ros: rosInstance.current,
        //   name: "/request_display/head_ui",
        //   messageType: "std_msgs/Int32",
        // });

        /* 독립기념관 추가 */
        /* 나레이션 음성 코드 실행 */
        const topic_requestSpeech = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/request_speech",
          messageType: "std_msgs/String",
        });

        /* 나레이션 음성 종료 */
        const topic_requestSpeechEnd = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/end_of_speech",
          messageType: "std_msgs/String",
        });

        /* 코스 주행 */
        /* 'started' or 'finished' */
        const topic_courseTrigger = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/i815_course_trigger",
          messageType: "std_msgs/String",
        });

         /* TTS 텍스트 */
         const topic_ttsSub = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "robot_assistant/tts_sub",
          messageType: "std_msgs/String",
        });

        /* 볼륨 조절 */
        /* 0 ~ 100 사이 값 */
        const topic_speakerVolume = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/robot_assistant/speaker/volume",
          messageType: "std_msgs/Float32",
        })

        /* 나레이션 수동 시작 */
        const topic_narrationStart = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/request_a_course_by_manual",
          messageType: "std_msgs/Empty",
        });

        /* A코스로 이동 */
        /* 추가 23/12/28 */
        const topic_requestACourse = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/request_a_course",
          messageType: "std_msgs/Empty",
        });

        /* B코스 이동 */
        /* 추가 23/12/28 */
        // `/request_drive_${scenarioName}_course`
        const topic_requestDriveBCourse = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/request_drive_b_course",
          messageType: "std_msgs/Empty",
        });

        /* 복귀 */
        const topic_i815RequestReturn = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/i815_request_return",
          messageType: "std_msgs/Empty",
        });

         /* 충전장소 복귀 */
        //  const topic_startAutoParking = new ROSLIB.Topic({
        //   ros: rosInstance.current,
        //   name: "/start_auto_parking",
        //   messageType: "std_msgs/Empty",
        // });

         const topic_startAutoParking = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/head_ui/start_auto_parking",
          messageType: "std_msgs/Empty",
        });

        /* 복귀 */
        const topic_i815RequestGoToCharging = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/i815_request_go_to_charging_station",
          messageType: "std_msgs/Empty",
        });
        
        /* 코스 취소 */
        const topic_i815Cancel = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/i815_cancel",
          messageType: "std_msgs/Empty",
        });

        /* 삼성전자 운행 모드 변경 0: 안내 1: 크루즈 2: 행사사 */
        const topic_samsungModeChange = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/head_ui/robot_mode",
          messageType: "std_msgs/Int32",
        });

        /* 발화 언어 변경 */
        const topic_headUiSettingsLang = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/head_ui/settings/lang",
          messageType: "std_msgs/String",
        });

        /* LLM 음성 대화모드 관련 */
        const topic_requestDisplay = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/request_display/head_ui",
          messageType: "std_msgs/Int32",
        });

        /* 관리자 모드 진입 시 일시정지 */
        const topic_activatedUiHead = new ROSLIB.Topic({
          ros: rosInstance.current,
          name: "/native_ui/activated_ui/head",
          messageType: "std_msgs/Bool",
        });

        setRosTopicList([
          {
            name: "topic/tts/sub",
            type: "sub",
            topicObj: topic_ttsSub,
            callback: (msg) => {
              setVoiceTalkingInfoTopicTTS(msg.data);
            },
          },
          {
            name: "voice_talking_info",
            type: "sub",
            topicObj: topic_voiceTalkingInfo,
            callback: (msg) => {
              console.log('voice_talking_info:', JSON.parse(msg.data));
              
              setVoiceTalkingInfoTopicValue(JSON.parse(msg.data));
            }
          },
          {
            name: "voice_action_state",
            type: "sub",
            topicObj: topic_voiceActionState,
            callback: (msg) => {
              console.log('voice_action_state:', msg.data);
              
              setVoiceActionStateTopicValue(msg.data);

            },
          },
          {
            name: "drive_pass_point",
            type: "sub",
            topicObj: topic_drivePassPoint,
            callback: (msg) => {
              console.log('drive_pass_point:', JSON.parse(msg.data));
            }
          },
          { name: "start_driving", type: "pub", topicObj: topic_startDriving },
          {
            name: "face_action_state",
            type: "pub",
            topicObj: topic_faceActionState,
          },
          {
            name: "request_shutter_sound",
            type: "sub",
            topicObj: topic_requestShutterSound,
            callback: (msg) => {
              if (photoActionStateTopicValue !== "uploading") {
                setPhotoActionStateTopicValue("shutter");
              } else {
                setPhotoActionStateTopicValue("shutter_error_uploading")
              }
            }
          },
          {
            name: "self_cam_url",
            type: "sub",
            topicObj: topic_selfCamUrl,
            callback: (msg) => {
              setPhotoActionStateTopicValue(msg.data);
            }
          },
          // {
          //   name: "face_settings",
          //   type: "sub",
          //   topicObj: topic_face_settings,
          //   callback: (msg) => {
          //     const { data } = msg;
          //     console.log('requestDisplay:', msg);
          //     setRequestFaceState({time:Date.now(), value: data})
          //   }
          // },
           /* 언어변경 요청*/
           {
            name: "head_ui_settings_lang",
            type: "pub",
            topicObj: topic_headUiSettingsLang,
          },
          {
            name: "robot_assistant/gpt/settings",
            type: "pub",
            topicObj: topic_gpt_settings,
          },
          /* 나레이션 음성 코드 실행 */
          {
            name: "request_speech",
            type: "pub",
            topicObj: topic_requestSpeech,
          },
          /* 나레이션 음성 종료 */
          {
            name: "end_of_speech",
            type: "pub",
            topicObj: topic_requestSpeechEnd,
          },
          /* 코스 주행 */
          /* 'started' or 'finished' */
          {
            name: "i815_course_trigger",
            type: "pub",
            topicObj: topic_courseTrigger,
          },
          
          /* 볼륨 조절 */
          /* 0 ~ 100 사이 값 */
          {
            name: "speaker_volume",
            type: "pub",
            topicObj: topic_speakerVolume,
          },
          /* 나레이션 수동 시작 */
          {
            name: "narration_start",
            type: "pub",
            topicObj: topic_narrationStart,
          },
          /* A코스로 이동 */
          {
            name: "request_a_course",
            type: "pub",
            topicObj: topic_requestACourse,
          },
          /* 이동 취소 */
          {
            name: "i815_cancel",
            type: "pub",
            topicObj: topic_i815Cancel,
          },
          /* B 코스 이동 */
          {
            name: "request_drive_b_cource",
            type: "pub",
            topicObj: topic_requestDriveBCourse,
          },
          /* 이동 복귀 */
          {
            name: "i815_request_return",
            type: "pub",
            topicObj: topic_i815RequestReturn,
          },
          /* 충전장소 복귀 */
          {
            name: "start_auto_parking",
            type: "sub",
            topicObj: topic_startAutoParking,
          },
          /* 충전장소 복귀 */
          {
            name: "i815_request_go_to_charging",
            type: "pub",
            topicObj: topic_i815RequestGoToCharging,
          },
           /* 관리자 요청에 의한 주행모드 변경 */
          {
            name: "samsung_mode_change",
            type: "pub",
            topicObj: topic_samsungModeChange,
          },
          {
            name: "activated_ui_head",
            type: "pub",
            topicObj: topic_activatedUiHead,
           /*  callback: (msg) => {
              if (photoActionStateTopicValue !== "uploading") {
                setPhotoActionStateTopicValue("shutter");
              } else {
                setPhotoActionStateTopicValue("shutter_error_uploading");
              }
            }, */
          },
           /* PlatyZ */
          /* LLM 음성대화 */
          {
            name: "request_display",
            type: "sub",
            topicObj: topic_requestDisplay,
            callback: (msg) => {
              const { data } = msg;
              console.log('requestDisplay:', msg);
              setRequestDisplayState({time:Date.now(), value: data})
              data === VOICE_STATE.listening && navigate("/voice")
            }
          },
        ]);

        setInitializeStep(INIT_STEP_ROS.CREATED_TOPIC);
        break;

      case INIT_STEP_ROS.CREATED_TOPIC:

        console.log("init subscribers", rosTopicList);
        if (rosTopicList.length > 0) {
          rosTopicList.map(({ name, type, topicObj, callback }) => {
            if (type === "sub") {
              topicObj.subscribe((msg: any) => {
                if (callback)
                  callback(msg);
              });
            }
          });
        }

        setInitializeStep(INIT_STEP_ROS.REGISTED_SUBSCRIBED);
        break;
    }
  }, [initializeStep, rosTopicList]);

  useEffect(() => {
    // console.log('voiceActionStateTopicValue', voiceActionStateTopicValue);
    actionAppVoiceState(voiceActionStateTopicValue);
    if (voiceActionStateTopicValue === "wakeup") {
      setVoiceTalkingInfoTopicValue({
        tts: "",
        stt: "",
        intent: "",
        emotion: "",
        speakingTime: 0,
      });
      navigate("/voice");
    } else if (voiceActionStateTopicValue === "listening" ||
                voiceActionStateTopicValue === "loading" ||
                voiceActionStateTopicValue === "speaking"
    ) {
      console.log(voiceTalkingInfoTopicValue);
      // 특정 대사에서는 voicepage 이동 하지 않음
      // if (voiceActionStateTopicValue === "speaking" &&
      //     voiceTalkingInfoTopicValue.tts === ""
      // ) {
      //   return;
      // }
      
      navigate("/voice");
      
    } else if(voiceActionStateTopicValue === "finish") {
      // setActionTimerCallback(2000, () => {
      //   setVoiceTalkingInfoTopicValue({
      //     tts: "",
      //     stt: "",
      //     intent: "",
      //     emotion: "",
      //     speakingTime: 0,
      //   })
      //   navigate("/");
      // })
    }
    
  }, [voiceActionStateTopicValue, voiceTalkingInfoTopicValue]);

  useEffect(() => {
    if (photoActionStateTopicValue !== "") {
      navigate("/");
    }
  }, [photoActionStateTopicValue])


  return (
    <RosEventManagerContext.Provider
      value={{
        robotLocationID,
        rosInstance: rosInstance.current,
        topicList: rosTopicList,

        voiceTalkingInfoTopicTTS,

        voiceActionStateTopicValue,
        setVoiceActionStateTopicValue,
        voiceTalkingInfoTopicValue,
        setVoiceTalkingInfoTopicValue,
        photoActionStateTopicValue,
        setPhotoActionStateTopicValue,

        publishTopic,

        // requestFaceState,
        requestDisplayState
      }}
    >
      {children}
    </RosEventManagerContext.Provider>
  );
}

export default RosEventManagerContext;
