import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IFcProps } from "../../Types/Common";

import * as UISounds from "../../Resources/Common/Sounds";

interface IPageLayerProps extends IFcProps {
  visibleMenu?: boolean;
}

export default function AppPageLayer({
  children,
  visibleMenu,
}: IPageLayerProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [audio, setAudio] = useState(new Audio());

  const handleClickHome = () => {
    console.log("go home");
    audio.src = UISounds.click;
    setTimeout(() => {
      navigate("/");
    }, 300);
  };
  const handleClickBack = () => {
    console.log("go back");
    audio.src = UISounds.click;
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };
  const handleClickVoice = () => {
    audio.src = UISounds.click;
    setTimeout(() => {
      navigate("/voice");
    }, 300);
  };

  useEffect(() => {
    console.log(location.pathname === "/");
    audio.autoplay = true;
    audio.volume = 0.2;
  }, []);

  // useEffect(() => {
  //   console.log('change location', location);
  // }, [location])

  return (
    <div id="app-page-layer" className="app-layer">
      {/* 페이지 표시 */}
      <div id="app-page-container">{children}</div>

      {/* 루트 페이지 or 음성 입/출력 페이지를 제외한 나머지 페이지 하단에 메뉴 표시 */}
      {location.pathname !== "/" && location.pathname !== "/voice" && (
        <div id="app-page-menu">
          <div id="btn-nav-settings" className="app-menu-item">
            <div className="click-area" />
          </div>
          <div
            id="btn-nav-mainmenu"
            className="app-menu-item"
          >
            <div className="click-area" onClick={handleClickHome} />
          </div>
          <div
            id="btn-nav-back"
            className="app-menu-item"
          >
            <div className="click-area" onClick={handleClickBack} />
          </div>
          {/* <div
            id="btn-nav-voiceinput"
            className="app-menu-item"
          >
            <div className="click-area" onClick={handleClickVoice} />
          </div> */}
        </div>
      )}
    </div>
  );
}
