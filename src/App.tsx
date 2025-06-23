import { useState, useContext, useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

// common modules
import RequestFrameInterval from "./Modules/RequestFrameInterval";

// Utils
import { combineComponents } from "./Utils";

// Contexts
import {
  InternalEventManagerContextProvider,
  RosEventManagerContextProvider,
  AppDataContextProvider,
  AppActionContextProvider,
  AppEffectLayerContextProvider,
  AppModalContextProvider,
  PageManagerContextProvider,
  AppDataContext,
  AppSettingsContextProvider
} from "./Contexts";

// Custom Hooks

// Common Styles
import "./Styles/Reset.css";
import "./Styles/App/App.scss";
import "./Styles/Icons.scss";

// Page Components
import FacePage from "./Pages/Face/FacePage";
import InfoPage from "./Pages/Info/InfoPage";
import SitePage from "./Pages/Site/SitePage";
import MainPage from "./Pages/MainPage/MainPage";
import DetailsHome from "./Pages/DetailsPage/DetailsPageHome/DetailsPageHome";
import DetailsMain from "./Pages/DetailsPage/DetailsPageMain/DetailsPageMain";
import SettingsPage from './Pages/SettingsPage/SettingsPage';

// Resources
// import mapData from './Resources/Docent/Data/lotteworld_folk_museum_waypoints.json';
// import mapData from "./Resources/Docent/Data/dcc_waypoints.json";
// import mapData from './Resources/Docent/Data/stk2023_waypoints.json';
// import mapData from './Resources/Docent/Data/stk_t_tower_waypoints.json';

import {
  AppMenuLayer,
  AppTouchLayer,
  AppEffectLayer,
  AppModalLayer,
  AppPageLayer,
} from "./Components/App";
import VoiceInputFullPage from "./Pages/VoiceInput/VoiceInputPage";
import TestButtonLayer from "./Components/Test/TestButtonLayer";
import AppActionStateTimer from "./Components/Test/AppActionStateTimer";

const providers = [
  AppSettingsContextProvider,
  RosEventManagerContextProvider,
  InternalEventManagerContextProvider,
  AppDataContextProvider,
  AppActionContextProvider,
  AppEffectLayerContextProvider,
  AppModalContextProvider,
  PageManagerContextProvider,
];

const AppContextProviders = combineComponents(...providers);

export enum APP_STATE {
  FACE = 1,
}

function App() {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const [state, setState] = useState<APP_STATE>(APP_STATE.FACE);

  const changeState = (state: APP_STATE) => {
    // navigate('/main')
    navigate("/main");
  };

  const { loadConfig, setMapData } = useContext(AppDataContext);

  RequestFrameInterval.start();

  useEffect(() => {
    console.log("JS Window inner:", window.innerWidth, window.innerHeight);
    // 기본크기 + 메뉴바 + 툴바 + 스크롤바 영역이 포함된 크기
    console.log("JS Window outer:", window.outerWidth, window.outerHeight);
    
    // console.log('process.env.REACT_APP_PRODUCT:', process.env.REACT_APP_PRODUCT);
    loadConfig();
    // const sortedMapData = mapData.sort((a, b) => a.id - b.id);
    // setMapData(sortedMapData);
  }, []);

  return (
    <div className="App">
      <AppPageLayer>
        <Routes>
          <Route path="/" element={<FacePage />} />
          <Route path="/voice" element={<VoiceInputFullPage />} />
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="/main" element={<MainPage />} />
          <Route path="/details" element={<DetailsHome />} />
          <Route path="/details/:contents" element={<DetailsMain />} />
          {/* <DocentPage /> */}
          <Route path="/docent_face" element={<FacePage />} />
          {/* <Route path="/site" element={<SitePage />} /> */}
          <Route path="/info/event/:contentsUrl" element={<InfoPage />} />
          <Route path="/info/:contentsUrl" element={<InfoPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppPageLayer>
      {/* <AppMenuLayer /> */}
      <AppModalLayer />
      <AppTouchLayer />
      {/* <AppEffectLayer /> */}
      {process.env.REACT_APP_PRODUCT === 'false' &&
        <TestButtonLayer />
      }
      {/* <AppActionStateTimer /> */}
    </div>
  );
}

export default function AppContainer() {
  return (
    <AppContextProviders>
      <App />
      {/* <AppWithRouterAccess /> */}
    </AppContextProviders>
  );
}
