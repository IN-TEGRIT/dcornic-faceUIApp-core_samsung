/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";

import ROSLIB from 'roslib';

import { Link, useNavigate } from "react-router-dom";

import "animate.css";
import { AppModalContext, RosEventManagerContext } from "../../../Contexts";

import * as UISounds from '../../../Resources/Common/Sounds';

import "./GridMenuItemComp.scss";

interface IGridMenuItemCompProps {
  index: number;
  gridArea: string;
  imgSrc: string;
  path?: string;
  func?: () => void;
  onClick?: () => void;
  topic_cmd?: string;
  disabled?: boolean;
  service?: {
    name: string;
    cmd: string;
    type: string;
    param: string;
    confirmText?: string;
  }
}

const samsung_mode = ["안내데스크", "로비", "귀빈대응"]

export default function GridMenuItemComp({
  index,
  gridArea,
  imgSrc,
  path,
  func,
  onClick,
  topic_cmd,
  disabled,
  service,
}: IGridMenuItemCompProps) {
  const navigate = useNavigate();
  const { alertDialog, confirmDialog } = useContext(AppModalContext);
  const { topicList, publishTopic } = useContext(RosEventManagerContext);
  const startDriveTopic = topicList.find(k => k.name === "start_driving")?.topicObj;
  
  const [showHoverEffect, setShowHoverEffect] = useState(false);

  const [audio, setAudio] = useState(new Audio());

  const handleMouseOver = (e: any) => {
    setShowHoverEffect(true);
  };

  const handleMouseOut = (e: any) => {
    setShowHoverEffect(false);
  };

  const handleClickItem = (e: any) => {
    e.preventDefault();
    if (disabled) {
      console.log('disabled component')
      alertDialog({
        title: "",
        contents: "현재 준비중 입니다",
      });
      return;
    }
    if (onClick) {
      audio.src = UISounds.click;
      setTimeout(() => {
        onClick()
      }, 300)
    } else if(service) {
      const { name, cmd, type, confirmText, param } = service;
      console.log('service', service);
      if (type === "move-area") {
        confirmDialog({
          type: 2,
          contents: `${param}구역으로 이동할까요?`,
          onOk: () => {
            // console.log("set init pose");
            publishTopic(cmd, param);
            navigate("/");
          },
        });
      } else if (type === "move-point") {
        confirmDialog({
          type: 2,
          contents: `${param}지점으로 이동할까요?`,
          onOk: () => {
            // console.log("set init pose");
            publishTopic(cmd);
            navigate("/");
          },
        });
      } else if (type === "change-mode") {
        confirmDialog({
          type: 2,
          contents: `${samsung_mode[parseInt(param, 10)]}지점으로 이동할까요?`,
          onOk: () => {
            // console.log("set init pose");
            console.log("cmd", cmd)
            console.log("param", param)
            
            publishTopic(cmd, param);
            navigate("/");
          },
        });
      } 
      else {
        if (confirmText) {
          confirmDialog({
            type: 2,
            contents: `${confirmText}`,
            onOk: () => {
              // console.log("set init pose");
              publishTopic(cmd);
              navigate("/");
            },
          });
        } else {
          publishTopic(cmd);
        }
      }
    } else {
      if (func) {
        func();
      } else if (path) {
        audio.src = UISounds.click;
        setTimeout(() => {
          navigate(path);
        }, 300)
      } else {
        audio.src = UISounds.failed;
        audio.currentTime = 2;
        audio.play();
      }
    }
  };

  useEffect(() => {
    audio.volume = 0.1;
    audio.autoplay = true;

  }, [])

  return (
    <div
      className="grid-menu-item"
      onTouchStart={handleMouseOver}
      onTouchEnd={handleMouseOut}
      onMouseUp={handleMouseOut}
      onClick={handleClickItem}
      style={{ gridArea }}
    >
      <img src={imgSrc} />
      <div className="img-effect"></div>
      {/* <div className="hover-effect animate__fadeIn animate__animated animate__faster" /> */}
      {showHoverEffect && <div className="hover-effect animate__fadeIn animate__animated animate__faster" />}
    </div>
  );
}
