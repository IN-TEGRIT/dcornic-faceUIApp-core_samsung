import { useContext, useEffect, useState } from "react";
import { AppActionContext, AppModalContext, RosEventManagerContext } from "../../Contexts";

import "./TestButtonLayer.scss";
export default function TestButtonLayer() {
  const {
    voiceActionStateTopicValue,
    setVoiceActionStateTopicValue,
    voiceTalkingInfoTopicValue,
    setVoiceTalkingInfoTopicValue,
    setPhotoActionStateTopicValue,
  } = useContext(RosEventManagerContext);

  const {
    setTimeoutRequest
  } = useContext(AppActionContext);


  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);

  const [listening, setListening] = useState(false);

  const wakeUp = () => {
    setVoiceActionStateTopicValue("wakeup");
    setTimeout(() => {
      setVoiceActionStateTopicValue("listening");
    }, 250);
  }

  const setVisable = () => {

  }

  const setInvisible = () => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 5000);
  }

  const talk1 = () => {
    // setVoiceTalkingInfoTopicValue({
    //   tts: "",
    //   stt: "",
    //   intent: "",
    //   emotion: "",
    // });
    setVoiceTalkingInfoTopicValue({
      tts: "화장실은 삼국시대실과 고려시대실 벽면에 있습니다",
      stt: "화장실 어디에 있어",
      intent: "",
      emotion: "",
    });

    setVoiceActionStateTopicValue("loading");

    setTimeout(() => {
      setVoiceActionStateTopicValue("speaking");
    }, 2000);

    setInvisible();
  }

  const talk2 = () => {
    setVoiceTalkingInfoTopicValue({
      stt: "민속박물관 소개",
      tts: `1989년 1월 14일 롯데그룹 문화사업의 일환으로 송파 장터와
      송파 산대놀이의 고장 잠실에 총면적 8,039㎡ 규모로 개관하였습니다.
      
      구석기시대부터 일제강점기까지의 우리 역사를 시대별로 구분하여 실제 유물 및 재현 모형을 통해 알기 쉽고 재미있게 관람이 가능하도록 전시되어 있습니다. 특히, 모형 촌은 8분의 1로 축소된 2천여 점의 인형을 이용하여 조선시대의 사계절과 세시풍속, 관혼상제, 양반과 서민들의 생활모습을 사실적으로 표현하였습니다.
      롯데월드 민속박물관은 진로 탐색과 역사 교육 등 다양한 교육 프로그램 및 전통 공예 체험 프로그램을 통해 직접 체험하며 즐기는 문화공간으로서의 역할을 이행하고 있습니다.`,
      intent: "",
      emotion: "",
    });

    setVoiceActionStateTopicValue("loading");

    setTimeout(() => {
      setVoiceActionStateTopicValue("speaking");
    }, 2000);

    // setActionTimerCallback(wordCount.length * 900, () => setVoiceActionStateTopicValue("finish"));
    // setTimeout(() => {
    //   setVoiceActionStateTopicValue("finish");
    // }, wordCount.length * 1000);
    setInvisible();
  }
  
  const setQRDialog = () => {
    setPhotoActionStateTopicValue("shutter");
    setTimeout(() => {
      setPhotoActionStateTopicValue("https://ik.imagekit.io/hd4uv5z531/12_TFjYnT6bs.jpg");
    }, 2000);
  }


  return (
    <div id="test-buttons-layer" style={{ visibility: visible ? 'visible' : 'hidden'}}>
      <div id="btn-layer-onoff">{active ? '>>' : '<<'}</div>
      <div className="test-button-group">
        <div className="title">VoiceStateTopicTest</div>
        <div className="contents">
          <div
            id="btn-test-voice-state-wakeup"
            className={`test-btn${voiceActionStateTopicValue === "wakeup" ? " active" : ""}`}
            onClick={wakeUp}
          >
            WakeUp
          </div>
          <div
            id="btn-test-voice-state-listen"
            className={`test-btn${voiceActionStateTopicValue === "listening" ? " active" : ""}`}
          >
            Listening
          </div>
          <div
            id="btn-test-voice-state-loading"
            className={`test-btn${voiceActionStateTopicValue === "loading" ? " active" : ""}`}
            onClick={() => setVoiceActionStateTopicValue("loading")}
          >
            Loading
          </div>
          <div
            id="btn-test-voice-state-speaking"
            className={`test-btn${voiceActionStateTopicValue === "speaking" ? " active" : ""}`}
            onClick={() => setVoiceActionStateTopicValue("speaking")}
          >
            Speaking
          </div>
          <div
            id="btn-test-voice-state-finish"
            className={`test-btn${voiceActionStateTopicValue === "finish" ? " active" : ""}`}
            onClick={() => setVoiceActionStateTopicValue("finish")}
          >
            Finish
          </div>
        </div>
      </div>

      <div className="test-button-group">
        <div className="title">VoiceTalkingInfoTest</div>
        <div className="contents">
          <div
            id="btn-test-voice-state-wakeup"
            className={`test-btn${
              voiceActionStateTopicValue === "listening" ? " active" : ""
            }`}
            onClick={talk1}
          >
            화장실
          </div>
          <div
            id="btn-test-voice-state-listen"
            className={`test-btn${
              voiceActionStateTopicValue === "listening" ? " active" : ""
            }`}
            onClick={talk2}
          >
            2
          </div>
          <div
            id="btn-test-voice-state-loading"
            className={`test-btn${
              voiceActionStateTopicValue === "listening" ? " active" : ""
            }`}
          >
            3
          </div>
        </div>
      </div>
      
      <div className="test-button-group">
        <div className="title">Dialog</div>
        <div className="contents">
          <div
            id="btn-test-qr-dialog"
            className={`test-btn`}
            onClick={setQRDialog}
          >
            QRDialog
          </div>
        </div>
      </div>
    </div>
  );
}
