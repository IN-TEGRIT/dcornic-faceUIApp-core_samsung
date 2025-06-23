export default function SiteViewer({contentsUrl}) {
  return (
    <div className="site-viewer" style={{
      width: '100%',
      display: 'block',
      padding: '24px 0',
    }}>
      <iframe src={contentsUrl} style={{width: '100%'}}/>

    </div>
  )
}