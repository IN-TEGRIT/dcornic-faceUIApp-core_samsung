/* eslint-disable jsx-a11y/alt-text */
import bgBody from './imgs/bg-body.png';
import bgHeader from './imgs/bg-header.png';
import imgHeaderText from './imgs/img-header-text.png';
import icCorpLogo from './imgs/ic-corp-log.png';
import icFig1 from './imgs/ic-fig-1.png';
import icFig2 from './imgs/ic-fig-2.png';
import icFig3 from './imgs/ic-fig-3.png';
import icFig4 from './imgs/ic-fig-4.png';
import icFig5 from './imgs/ic-fig-5.png';

import imgLogo1 from './imgs/ic-logo-1.png';
import imgLogo2 from './imgs/ic-logo-2.png';
import imgLogo3 from './imgs/ic-logo-3.png';
import imgLogo4 from './imgs/ic-logo-4.png';

import './DConicInfo.scss';

export default function Contents_DConicInfo() {
  return (
    <div id="content-page-dconic-info">
      <section className="head-bg">
        <div className="body">
          <p className="head" style={{ fontSize: '2.75rem', color: '#002060' }}>
            AI 소셜 로봇의<br />
            새로운 기준<br />
            <b>디코닉™</b>
          </p>
          <img src={imgHeaderText}></img>
        </div>
      </section>
      
      <section className="info-1">
        <div className="img-fig" style={{ width: '6rem'}}>
          <img src={icFig1} style={{ marginLeft: '-0.25rem' }}/>
        </div>
        <div className="body" style={{ width: 'calc(100% - 6rem)', textIndent: '.5rem', paddingLeft: '1.75em' }}>
          <p className="head1" style={{ fontSize: '2.25rem', marginLeft: '-0.875rem', lineHeight: 1.25 }}>
            “Hey <b>디코닉!”</b>
          </p>
          <p className="head2" style={{ fontSize: '2.25rem', marginBottom: '1rem', lineHeight: 1 }}>
            디코닉과 즐겁게 대화해 보세요!
          </p>

          <p className="content" style={{ fontSize: '1.5rem' }}>
            첨단 AI 대화 엔진과 자연어 인식, 사운드 전처리 시스템으로 노이즈로 가득한 실내공간에서도 AI 음성 대화, AI 도슨트 서비스를 제공하는 업계 최초, AI 컨시어지 로봇 입니다
          </p>
        </div>
      </section>

      <section className="info-2">
        <div className="body" style={{ width: 'calc(100% - 7.5rem)' }}>
          <p className="head" style={{ fontSize: '2.25rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            고성능 스마트 칩셋과 AI로<br />
            더 스마트한 로봇이 탄생했습니다
          </p>
          <p className="content">
            스마트폰에서 사용되는 첨단 퀄컴 스냅드래곤 칩셋과 강력한 AI 가속 칩, 초고속 5G 네트워크와 안드로이드 시스템, 오픈 데이터 플랫폼을 채택한 최초의 고성능 소셜 로봇 입니다
          </p>
        </div>
        <div className="img-fig" style={{ textAlign: 'right', width: '7.5rem' }}>
          <img src={icFig2} style={{ marginRight: '-20px' }}/>
        </div>
      </section>

      <section className="info-3">
        <div className="body">
          <p className="head" style={{ fontSize: '2.25rem', marginBottom: '1rem', lineHeight: 1.2, color: '#002060' }}>
            첨단 기술과 감성으로 공간의<br />
            안전을 더합니다
          </p>
          <p className="content">
            디코닉은 고해상도 라이다와 비전 카메라, 초음파 센서, 고해상도 열화상 카메라 까지 현존하는 최고 사양의 실내 AI 자율주행 시스템으로, 첨단 퓨전 센싱과 공간정보와 인구정보까지 복잡한 실내 환경에서 스스로 목표를 설정하고 미션을 수행할 수 있는 첨단 자율주행 서비스 로봇입니다
          </p>
        </div>
      </section>

      <section className="info-4">
        <div className="img-fig" style={{ width: '6rem' }}>
          <img src={icFig3} />
        </div>
        <div className="body" style={{ flex: 1, paddingLeft: '.5rem' }}>
          <p className="head" style={{ fontSize: '2.25rem', marginBottom: '1rem', lineHeight: 1.2, color: '#002060' }}>
            공간과 고객을 이해하고<br />
            안전사고를 예방합니다
          </p>
          <p className="content">
            디코닉은 고해상도 라이다와 비전 카메라, 초음파 센서, 고해상도 열화상 카메라 까지 현존하는 최고 사양의 실내 AI 자율주행 시스템으로, 첨단 퓨전 센싱과 공간정보와 인구정보까지 복잡한 실내 환경에서 스스로 목표를 설정하고 미션을 수행할 수 있는 첨단 자율주행 서비스 로봇입니다
          </p>
        </div>
      </section>

      <section className="info-5">
        <div className="img-fig" style={{ width: '6rem'}}>
          <img src={icFig4} />
        </div>
        <div className="body" style={{ flex: 1, paddingLeft: '.5rem' }}>
          <p className="head" style={{ fontSize: '2.25rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            로봇과 가상공간이 하나되는<br />
            디지탈 트윈을 제공합니다
          </p>
          <p className="content">
            공간과 고객을 살피며 더 안전한 서비스를 위하여 보안과 인증, 제어와 원격제어, 로봇 디지탈 트윈 플랫폼으로 로봇의 작은 움직임 하나하나 까지 정교하게 관리됩니다
          </p>
        </div>
      </section>

      <section className="info-6">
        <div className="img-fig" style={{ width: '11rem' }}>
          <img src={icFig5} />
        </div>
        <div className="body" style={{ flex: 1, paddingLeft: '1.5rem' }}>
          <p className="head" style={{ fontSize: '2.25rem', marginBottom: '1rem', lineHeight: 1.2, color: '#002060' }}>
            지능형 미디어 서비스로<br />
            최적화된 맞춤 정보를 제공합니다
          </p>
          <p className="content">
            장소와 위치 시간에 따라 고객에게 맞춤 컨텐츠와 미디어를 전달하는 강력한 미디어 브로드캐스팅 서비스를 제공합니다
          </p>
        </div>
      </section>

      <section className="logos">
        <figure>
          <img src={imgLogo1} />
        </figure>
        <figure>
          <img src={imgLogo2} />
        </figure>
        <figure>
          <img src={imgLogo3} />
        </figure>
        <figure style={{ maxWidth: '20%' }}>
          <img src={imgLogo4} style={{ width: '60%', marginLeft: '30%' }}/>
        </figure>
      </section>

      <section className="end" style={{ display: 'flex', flexDirection:'column', alignItems: 'center', marginBottom: '10rem' }}>
        <p className="content" style={{ display: 'block', textAlign: 'center', lineHeight: 1.25, marginBottom: '.5rem' }}>
          도전과 혁신으로 가득한 첨단 로봇 서비스에는<br />
          인티그리트의 첨단 AI 로보틱스 플랫폼이 함께 하고 있습니다
        </p>
        <p className="logo" style={{ display: 'block' }}>
          <img src={icCorpLogo} style={{ width: '15%' }}/>
        </p>
      </section>
    </div>
  )
}