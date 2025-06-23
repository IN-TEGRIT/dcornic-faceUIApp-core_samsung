import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import "animate.css";

import { PageOpenningEffectLayer } from "../../Components/Effect";
import "./MainPage.scss";

import MainMenuContainer from "./MainMenuContainer";
import { AppModalContext } from "../../Contexts";

const PASSWORD = "1111#";

export default function MainPage() {
  const navigate = useNavigate();
  const { alertDialog } = useContext(AppModalContext);
  
  const [valueInputPasword, setValueInputPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState(false);

  const [focusOnInput, setFocusOnInput] = useState(false);
  
  const [valueDriveOn, setValueDriveOn] = useState(true);
  const [scrollingState, setScrollingState] = useState(false);

  const getTopPosPopup = () => {
    if (!window?.cordova) {
      return "50%";
    } else {
      return focusOnInput ? "36%" : "50%";
    }
  };

  const handleClickCancel = (e: any) => {
    e.preventDefault();
    navigate("/");
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

    if (valueInputPasword !== PASSWORD) {
      alertDialog({
        title: "",
        contents: "잘못된 비밀번호를 입력하셨습니다",
      });
      return;
    }

    if (valueInputPasword === PASSWORD) {
      setCheckedPassword(true);
    }
  };

  if (!checkedPassword) {
    return (
      <div id="settings-page" className="page">
        <div id="settings-password-popup" className="dialog-container">
          <div className="dim" />
          <div
            className="popup"
            style={{
              top: getTopPosPopup(),
            }}
          >
            <div className="header">
              <div className="label">패스워드 입력</div>
            </div>
            <div className="contents">
              <div className="input-container">
                <input
                  type="password"
                  maxLength={16}
                  onChange={(e) => setValueInputPassword(e.target.value)}
                  autoComplete="off"
                  onFocus={() => setFocusOnInput(true)}
                  onBlur={() => setFocusOnInput(false)}
                ></input>
              </div>
            </div>
            <div className="button-container">
              <div id="btn-cancel-password" className="popup-button" onClick={handleClickCancel}>
                취&nbsp;&nbsp;&nbsp;&nbsp;소
              </div>
              <div id="btn-confirm-password" className="popup-button" onClick={handleClickConfirm}>
                확&nbsp;&nbsp;&nbsp;&nbsp;인
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="main-page" className="page">
      <PageOpenningEffectLayer />
      <div className="view-area">
        <MainMenuContainer pos="current" />
      </div>
    </div>
  );
}
