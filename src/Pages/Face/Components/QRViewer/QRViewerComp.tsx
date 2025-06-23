import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

import * as UISounds from "../../../../Resources/Common/Sounds";

import './QRViewerComp.scss';

export default function QRViewer({url, closeHandler}: {url: string, closeHandler: () => void}) {
  const [audio, setAudio] = useState(new Audio());
  const [imageInfo, setImageInfo] = useState({width: 0, height: 0});

  useEffect(() => {
    audio.autoplay = true;
    audio.volume = 0.6;

    audio.src = UISounds.success;
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageInfo({
        width: img.width,
        height: img.height,
      })
    }
  }, [url]);

  return (
    <div id="qr-viewer-comp">
      <div className="container animate__fadeInDown animate__animated">
        <div id="btn-close-photo" onClick={closeHandler}></div>
        <div className="photo-wrapper">
          <img src={url} style={{
            width: imageInfo.width > imageInfo.height ? '100%' : '',
            height: imageInfo.height >= imageInfo.width ? '100%' : '',
          }}></img>
        </div>
        <div className="info-area">
          <div className="info">
            <div className="header">
              촬영이 완료되었습니다.
            </div>
            <div className="desc">
              휴대폰으로 QR코드를<br/>촬영해 보세요
            </div>
            <div className="danger">
              사진은 1시간후 삭제됩니다.
            </div>
          </div>
          <div className="qr-wrapper">
            <QRCode value={url} size={80}/>
          </div>
        </div>
      </div>
    </div>
  )
}