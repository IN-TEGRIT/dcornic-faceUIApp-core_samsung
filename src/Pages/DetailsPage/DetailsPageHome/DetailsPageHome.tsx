import React, { useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import "animate.css";

import { PageOpenningEffectLayer } from "../../../Components/Effect";

import DetailsPageHomeMenuContainer from "./DetailsPageHomeMenuContainer";

import "./DetailsPageHome.scss";

export default function DetailsPage() {
  const [scrollingState, setScrollingState] = useState(false);

  return (
    <div id="details-menu-page" className="page">
      <PageOpenningEffectLayer />
      <div className="view-area">
        <DetailsPageHomeMenuContainer pos="current" />
      </div>
    </div>
  );
}
