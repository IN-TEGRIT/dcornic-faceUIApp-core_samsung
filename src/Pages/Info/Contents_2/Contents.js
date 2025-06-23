import imgContents from './Contents.png'

/* 더현대 무역센터점 행사 - 1
 * 날짜 : 2023-05-04 
 */
export default function Contents() {
  return (
    <div className="contents-event" style={{
      width: '100%',
      display: 'block'
    }}>
      <img src={imgContents} style={{width: '100%'}}/>

    </div>
  )
}