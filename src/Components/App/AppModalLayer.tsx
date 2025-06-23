import { useContext } from "react";
import AppModalContext from "../../Contexts/AppModalContext/AppModalContext";
import QRCode from "react-qr-code";

import { EModalType } from "../../Types/Modal.d";
import "animate.css";
import "./AppModal.scss";

export default function AppModalLayer() {
  const { modalInfo, closeDialog } = useContext(AppModalContext);

  if (modalInfo.modalType === EModalType.CONFIRM) {
    return (
      <div id="app-modal-layer" className="app-layer">
        <div className="dim" />
        <div className="popup animate__fadeInUp animate__animated animate_fast">
          <div className="contents">{modalInfo.contents}</div>
          <div className="button-container">
            <div
              id="btn-cancel"
              className="popup-button"
              onClick={(e) => {
                e.stopPropagation();
                closeDialog();
                if (!modalInfo.onCancel) return;
                modalInfo.onCancel();
              }}
            ></div>
            <div
              id="btn-confirm"
              className="popup-button"
              onClick={(e) => {
                e.stopPropagation();
                closeDialog();
                if (!modalInfo.onOk) return;
                modalInfo.onOk();
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  } else if (modalInfo.modalType === EModalType.CONFIRM_2) {
    return (
      <div id="app-modal-layer2" className="app-layer">
        <div className="dim" />
        <div className="popup animate__fadeIn animate__animated animate_faster">
          <div className="btn-close" onClick={closeDialog}/>
          <div className="contents">{modalInfo.contents}</div>
          <div className="button-container">
            <div
              id="btn-cancel"
              className="popup-button"
              onClick={(e) => {
                e.stopPropagation();
                closeDialog();
                if (!modalInfo.onCancel) return;
                modalInfo.onCancel();
              }}
            ></div>
            <div
              id="btn-confirm"
              className="popup-button"
              onClick={(e) => {
                e.stopPropagation();
                closeDialog();
                if (!modalInfo.onOk) return;
                modalInfo.onOk();
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  } else if (modalInfo.modalType === EModalType.ALERT) {
    return (
      <div id="app-modal-layer2" className="app-layer">
        <div className="dim" />
        <div className="popup alert animate__fadeIn animate__animated animate_faster">
          <div className="btn-close" onClick={closeDialog}/>
          <div className="contents">{modalInfo.contents}</div>
          <div className="button-container">

            <div
              id="btn-confirm"
              className="popup-button"
              onClick={(e) => {
                e.stopPropagation();
                closeDialog();
                if (!modalInfo.onOk) return;
                modalInfo.onOk();
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
