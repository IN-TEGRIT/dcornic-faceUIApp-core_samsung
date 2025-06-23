import React from 'react';

import 'animate.css';

import './UIAction.scss';

export default function UIAction({onClickConfirm, onClickCancel}) {
  return (
    <div id="face-page-ui-action">
      <div className="popup animate__bounceInUp animate__animated">
        <div className="contents">
          <i className='warning' /><span>다음 장소로 이동할까요?</span></div>
        <div className="btn-container">
          <div className="button cancel" onClick={onClickCancel}>아니오</div>
          <div className="button confirm" onClick={onClickConfirm}>예</div>
        </div>
      </div>
    </div>
  );
}
