/* eslint-disable jsx-a11y/alt-text */
import imgTimetable1 from './skttechsummit_01.png';
import imgTimetable2 from './skttechsummit_02.png';
import imgTimetable3 from './skttechsummit_03.png';
import imgTimetable4 from './skttechsummit_04.png';
import './infopage.scss';
export default function Contents_SktechsummitTimetable() {
  return (
    <div className="contents-event" style={{
      width: '100%',
      display: 'block'
    }}>

      <img src={imgTimetable1} style={{width: '100%'}}/>
      <img src={imgTimetable2} style={{width: '100%'}}/>
      <img src={imgTimetable3} style={{width: '100%'}}/>
      <img src={imgTimetable4} style={{width: '100%'}}/>

    </div>
  )
}