import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Contents Components
import ServiceContents from "./ServiceContents/ServiceContents";
import DrivingContents from "./DrivingContents/DrivingContents";
import ControlContents from "./ControlContents/ControlContents";
import NarrationContents from "./NarrationContents/NarrationContents";

// Resources
import icControl from "../../../Resources/DetailsPage/tabicons/ic-control-w.png";
import icDriving from "../../../Resources/DetailsPage/tabicons/ic-driving-w.png";
import icService from "../../../Resources/DetailsPage/tabicons/ic-service-w.png";
import icSettings from "../../../Resources/DetailsPage/tabicons/ic-settings-w.png";
import icSpeaker from "../../../Resources/DetailsPage/tabicons/ic-speaker-w.png";

// Styles
import "./DetailsPageMain.scss";

const TAB_MENUS = [
  {
    icon: icService,
    label: "서비스",
    path: "services",
    component: <ServiceContents />,
  },
  {
    icon: icSpeaker,
    label: "나레이션",
    path: "narration",
    component: <NarrationContents />,
  },
  {
    icon: icDriving,
    label: "자율 이동",
    path: "driving",
    component: <DrivingContents />,
  },
  {
    icon: icControl,
    label: "수동 조작",
    path: "control",
    component: <ControlContents />,
  },
];

export default function DetailsPageMain() {
  let { contents } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(0);

  const renderSubPage = () => {
    return TAB_MENUS?.find((menu) => menu?.path + '' === contents + '')?.component || <></>;    
  }

  useEffect(() => {
    console.log("contents:", contents);
  }, [contents]);

  return (
    <div id="details-page-main">
      <div className="details-tab-container">
        <div className="details-tab-nav">
          {TAB_MENUS.map((item, index) => {
            return (
              <div
                className={`tab-item${
                  item.path === contents ? " selected" : ""
                }`}
                onClick={() => navigate(`/details/${item.path}`)}
              >
                <div className="contents">
                  <img src={item.icon} />
                  <div className="label">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="details-tab-contents">
          {renderSubPage()}
        </div>
      </div>
    </div>
  );
}
