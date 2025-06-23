import React, { useContext } from "react";

import { AppModalContext, RosEventManagerContext } from "../../../../Contexts";

import imgContents from '../../../../Resources/DetailsPage/images/img-07-b04.png';
import icSpeaker from '../../../../Resources/DetailsPage/icons/ic-speaker.png';
import icClose from '../../../../Resources/DetailsPage/icons/ic-close-r.png';

import './NarrationContents.scss';

export default function NarrationContents() {
  const { confirmDialog } = useContext(AppModalContext);
  const { publishTopic } = useContext(RosEventManagerContext);

  const handleClickNarrationPlay = (e: any) => {
    e.preventDefault();
    confirmDialog({
      type: 2,
      contents: `귀빈안내를 시작하시겠습니까?`,
      onOk: () => {
        console.log("play narration");
        publishTopic("narration_start");
      },
    });
  }

  const handleClickNarrationCancel = (e: any) => {
    e.preventDefault();
    confirmDialog({
      type: 2,
      contents: `귀빈안내를 취소하시겠습니까?`,
      onOk: () => {
        console.log("cancel narration");
        
      },
    });
  }

  return (
    <div id="details-narration-contents" className="contents">
      <div className="img-area">
        <img src={imgContents} />
      </div>
      <div className="button-area">
        <div id="btn-play-narration" className="round-button" onClick={handleClickNarrationPlay}>
          <img src={icSpeaker} />
          귀빈안내 시작
        </div>
        <div id="btn-cancel-narration" className="round-button" onClick={handleClickNarrationCancel}>
          <img src={icClose} />
          귀빈안내 취소
        </div>
      </div>
    </div>
  )
}