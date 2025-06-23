# dcornic-faceUIApp-core_samsung

## 1. 프로젝트 개요
- 삼성 스마트오피스용 AI 미디어로봇(플래티Z)의 얼굴 UI 및 음성 인터랙션 코어 기능을 담당하는 프론트엔드 프로젝트입니다.

## 2. 주요 기능
- **얼굴 애니메이션 UI**: 다양한 감정 상태(기본, 기쁨, 놀람, 슬픔 등)에 따라 동영상 기반 얼굴 애니메이션을 재생합니다. (`src/Pages/Face/FacePage.js`)
- **음성 입력 및 안내**: 음성 인식 UI와 상태(대기, 듣기, 생각, 말하기 등)를 관리합니다. (`src/Pages/VoiceInput/VoiceInputPage.tsx`)
- **QR코드 사진 다운로드**: 사진 촬영 후 QR코드를 통해 다운로드할 수 있는 UI 제공 (`src/Pages/Face/Components/QRViewer/QRViewerComp.tsx`)
- **로봇 상태/이동 안내**: 주요 UI에서 다음 장소 이동 등 안내 팝업 제공
- **ROS(Robot Operating System) 연동**: ROS 토픽을 통한 상태 관리 및 이벤트 송수신 (`src/Contexts/Ros/RosEventManagerContext.tsx`)
- **모드 변경**: 관리자 모드에 진입하여 안내 모드 / 크루즈 모드 / 행사모드 변경 지원 

## 3. 폴더/파일 구조
- `/src`
  - `App.tsx`: 라우팅 및 전체 앱 구조
  - `Pages/`: 주요 화면(페이지) 구성
    - `Face/`: 얼굴 UI 및 상태 관리
    - `VoiceInput/`: 음성 입력 UI
    - `MainPage/`, `DetailsPage/`, `SettingsPage/`, `Info/`, `Site/`: 각종 서비스 페이지
  - `Components/`: 공통 UI 컴포넌트
    - `Common/WeatherWidget/`, `Switch/`, `SegmentedControlComp/` 등
  - `Contexts/`: 전역 상태 및 ROS 연동 컨텍스트
  - `Modules/`: 기능별 모듈 (예: RequestFrameInterval)
  - `Resources/`: 동영상, 이미지, 사운드 등 리소스
  - `Types/`: 타입 정의
  - `Utils/`, `Hooks/`, `Document/`: 유틸, 커스텀 훅, 문서 등
- `public/`: 정적 파일
- `package.json`, `tsconfig.json`: 프로젝트 설정

## 4. 개발 및 실행 방법

### 4-1. 설치
```bash
yarn install
# 또는
npm install
```

### 4-2. 개발 서버 실행
```bash
yarn start
# 또는
npm start
```

### 4-3. 빌드
```bash
yarn build
# 또는
npm run build
```

## 5. 주요 의존성
- Node.js (권장 버전: 16 이상)
- React
- TypeScript
- ROSLIB.js (로봇 연동)
- animate.css, react-qr-code 등

## 6. 환경설정 및 주의사항
- `.env` 파일에 환경 변수(예: REACT_APP_ROBOT_MODEL 등) 필요시 추가
- ROS 서버 주소 등은 `src/Contexts/Ros/RosEventManagerContext.tsx`에서 기본값 확인
- 동영상/이미지/사운드 리소스는 `src/Resources/`에 위치

## 7. 자주 사용하는 명령어
- 테스트: `yarn test` 또는 `npm test`
- 린트: `yarn lint` 또는 `npm run lint`

## 8. 참고 자료
- `src/Document/PAGE.md`: 페이지 구조 설명
- ROS 연동 관련 공식 문서: http://wiki.ros.org/ja/roslibjs

## 9. 담당자
- (필요시 작성)

---

> **참고:**  
> 인수인계 자료는 문서(텍스트) 형식으로만 제공하며, 동영상 형식의 자료는 일부러 제외하였습니다.
