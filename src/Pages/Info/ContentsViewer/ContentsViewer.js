export default function Contents({contentsUrl}) {
  return (
    <div className="contents-viewer" style={{
      width: '100%',
      display: 'block',
      padding: '24px 0',
    }}>
      <img src={contentsUrl} style={{width: '100%'}}/>

    </div>
  )
}