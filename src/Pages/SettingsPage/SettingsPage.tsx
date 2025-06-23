import { useState, useRef, useContext, LegacyRef } from "react";

import Switch from "../../Components/Common/Switch/Switch";
import LanguageSettingButton_ChatGPT from "../../Components/Common/LanguageSettingButton_ChatGPT/LanguageSettingButton_ChatGPT";
import { AppModalContext } from "../../Contexts";

import "./SettingsPage.scss";

declare global {
  interface Window {
    cordova: any;
  }
}

export default function SettingsPage() {
  const { alertDialog } = useContext(AppModalContext);

  const [valueInputPasword, setValueInputPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState(false);

  const [focusOnInput, setFocusOnInput] = useState(false);

  const [valueDriveOn, setValueDriveOn] = useState(true);

  const getTopPosPopup = () => {
    if (!window?.cordova) {
      return "50%";
    } else {
      return focusOnInput ? "36%" : "50%";
    }
  };

  const handleClickCancel = (e: any) => {
    e.preventDefault();

  }

  const handleClickConfirm = () => {
    // console.log(valueInputPasword)

    if (valueInputPasword.length === 0 || valueInputPasword === "") {
      alertDialog({
        title: "",
        contents: "비밀번호를 입력해 주세요",
      });
      return;
    }

    if (valueInputPasword === "1111") {
      setCheckedPassword(true);
    }
  };

  const handleClickKeyboard = () => {};

  // if (!checkedPassword) {
  //   return (
  //     <div id="settings-page" className="page">
  //       <div id="settings-password-popup" className="dialog-container">
  //         <div className="dim" />
  //         <div
  //           className="popup"
  //           style={{
  //             top: getTopPosPopup(),
  //           }}
  //         >
  //           <div className="header">
  //             <div className="label">패스워드 입력</div>
  //           </div>
  //           <div className="contents">
  //             <div className="input-container">
  //               <input
  //                 type="password"
  //                 maxLength={16}
  //                 onChange={(e) => setValueInputPassword(e.target.value)}
  //                 autoComplete="off"
  //                 onFocus={() => setFocusOnInput(true)}
  //                 onBlur={() => setFocusOnInput(false)}
  //               ></input>
  //             </div>
  //           </div>
  //           <div className="button-container">
  //             <div id="btn-cancel-password" className="popup-button" onClick={handleClickCancel}>
  //               취&nbsp;&nbsp;&nbsp;&nbsp;소
  //             </div>
  //             <div id="btn-confirm-password" className="popup-button" onClick={handleClickConfirm}>
  //               확&nbsp;&nbsp;&nbsp;&nbsp;인
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div id="settings-page" className="page">
      <div className="main-title">설정</div>
      {/* <section className="group">
        <div className="group-title">주행 설정</div>

        <div className="row">
          <div className="title">주말 주행 금지</div>
          <div className="contents">
            <Switch value={valueDriveOn} onChange={setValueDriveOn} />
          </div>
        </div>
      </section> */}

      {/* <section className="group">
        <div className="group-title">시스템 설정</div>

        <div className="row">
          <div className="title">볼륨</div>
          <div className="contents">
            <input type="range" id="vol" name="vol" min="0" max="100" style={{width: '100%'}} />
          </div>
        </div>
      </section> */}

      <section className="group">
        <div className="group-title">언어 설정</div>

        <div className="row">
          <div className="title">언어</div>
          <LanguageSettingButton_ChatGPT />
          {/* <div className="contents">
            <input type="range" id="vol" name="vol" min="0" max="100" style={{width: '100%'}} />
          </div> */}
        </div>
      </section>
    </div>
  );
}
