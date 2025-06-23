import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { EFaceState } from '../../../../Types/Face.d';
import { RosEventManagerContext } from '../../../../Contexts';
import './VoiceInputComp.scss';
import 'animate.css';

const ANIMATE_CLASS = {
  OPEN: ' animate__fadeInDown animate__animated',
  CLOSING: ' animate__fadeOut animate__animated'
}
export default function VoiceInputComp() {
  let navigate = useNavigate();
  const [animateClass, setAniamateClass] = useState(ANIMATE_CLASS.OPEN)
  const { topicList, publishTopic } = useContext(RosEventManagerContext);

  const handleClickVoiceIcon = (e: any) => {
    e.preventDefault();
    console.log('handleClickVoiceIcon');
    setAniamateClass(ANIMATE_CLASS.CLOSING);

    setTimeout(() => {
      navigate('/main');
      publishTopic("activated_ui_head", true)
    }, 500);
  };

  return (
    <div id="face-voice-input-comp" onClick={handleClickVoiceIcon} onTouchEnd={handleClickVoiceIcon}>
      <div className={`img-input-voice type-5${animateClass}`} />
    </div>
  )
}