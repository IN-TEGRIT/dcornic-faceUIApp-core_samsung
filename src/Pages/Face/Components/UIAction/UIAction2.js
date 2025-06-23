import React from 'react';

import 'animate.css';

import './UIAction2.scss';

export default function UIAction2({onClickConfirm, onClickCancel}) {
  return (
    <div id="face-page-ui-action2">
      <div className="popup animate__bounceInUp animate__animated">
        <div className="contents">
          <i className='warning' /><span>다음 장소로 이동할까요?</span></div>
        <div className="btn-container">
          <div className="button cancel" onClick={onClickCancel}></div>
          <div className="button confirm" onClick={onClickConfirm}></div>
        </div>
      </div>
    </div>
  );
}
