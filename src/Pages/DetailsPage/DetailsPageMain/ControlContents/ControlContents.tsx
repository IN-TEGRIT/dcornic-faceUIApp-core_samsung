/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from "react";

import { AppModalContext, RosEventManagerContext } from "../../../../Contexts";

import "./ControlContents.scss";

// Resources
import icArrow from "../../../../Resources/DetailsPage/icons/ic-arrow-g.png";
import icPin from "../../../../Resources/DetailsPage/icons/ic-init-location.png";
import icBolt from "../../../../Resources/DetailsPage/icons/ic-bolt.png";
import { useNavigate } from "react-router-dom";
export default function ControlContents() {

  const navigate = useNavigate();
  const { confirmDialog } = useContext(AppModalContext);
  const { topicList, publishTopic } = useContext(RosEventManagerContext);
  const [currentDownButton, setCurrentDownButton] = useState("none");

  const handleDownBtnGo = (e: any) => {
    e.preventDefault();
    if (e.currentTarget.dataset.controlDir) {
      console.log(e.currentTarget);
      console.log(e.currentTarget.dataset);
      console.log(e.currentTarget.dataset.controlDir);
      console.log(e.currentTarget.dataset.controlDir);
      console.log(e.currentTarget.dataset.controlDir);
      const { controlDir } = e.currentTarget.dataset;
      setCurrentDownButton(() => controlDir);
      return;
    }
    setCurrentDownButton(() => "none");
  };

  const handleUpBtnGo = (e: any) => {
    e.preventDefault();
    setCurrentDownButton(() => "none");
  };

  const handleClickInitPose = (e: any) => {
    e.preventDefault();
    confirmDialog({
      type: 2,
      contents: `현재위치를 초기위치로 설정할까요?`,
      onOk: () => {
        console.log("set init pose");
      },
    });
  }

  const handleClickGoToCharger = (e: any) => {
    e.preventDefault();
    confirmDialog({
      type: 2,
      contents: `충전장소로 복귀할까요?`,
      onOk: () => {
        console.log("go to charger");
        publishTopic('i815_request_go_to_charging');
        navigate("/");
      },
    });
  }

  return (
    <div id="details-control-contents" className="contents">
      <div className="controller-container">
        <div className="dir-control-area">
          <div
            className={`btn-go${
              currentDownButton === "forward" ? " active" : ""
            }`}
            data-control-dir="forward"
            onTouchStart={handleDownBtnGo}
            onTouchEnd={handleUpBtnGo}
          >
            <img src={icArrow} />
          </div>
          <div
            className={`btn-go${currentDownButton === "right" ? " active" : ""}`}
            data-control-dir="right"
            onTouchStart={handleDownBtnGo}
            onTouchEnd={handleUpBtnGo}
          >
            <img src={icArrow} />
          </div>
          <div
            className={`btn-go${
              currentDownButton === "backward" ? " active" : ""
            }`}
            data-control-dir="backward"
            onTouchStart={handleDownBtnGo}
            onTouchEnd={handleUpBtnGo}
          >
            <img src={icArrow} />
          </div>
          <div
            className={`btn-go${currentDownButton === "left" ? " active" : ""}`}
            data-control-dir="left"
            onTouchStart={handleDownBtnGo}
            onTouchEnd={handleUpBtnGo}
          >
            <img src={icArrow} />
          </div>
        </div>
      </div>
      <div className="button-area">
        <div id="btn-init-pose" className="round-button" onClick={handleClickInitPose}>
          <img src={icPin} />
          초기위치 설정
        </div>
        <div id="btn-go-to-charger" className="round-button" onClick={handleClickGoToCharger}>
          <img src={icBolt} />
          충전장소 복귀
        </div>
      </div>

    </div>
  );
}
