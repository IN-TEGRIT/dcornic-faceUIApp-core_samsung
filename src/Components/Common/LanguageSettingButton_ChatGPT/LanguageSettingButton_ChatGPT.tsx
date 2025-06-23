import React, { useContext, useState } from "react";
import ROSLIB from "roslib";

// Contexts
import { AppSettingsContext, RosEventManagerContext } from "../../../Contexts";

import imgKor from '../../../Resources/Common/Icons/languageSettingChatGPT/ic-language-chatgpt-kor.png';
import imgEng from '../../../Resources/Common/Icons/languageSettingChatGPT/ic-language-chatgpt-eng.png';

import './LanguageSettingButton_ChatGPT.scss';

interface DropdownMenuProps {
  lng: string;
  setSettings: React.Dispatch<React.SetStateAction<any>>;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const languageOptions = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  // ... 추가 언어 객체
];

const DropdownMenu = function({lng, setSettings, setMenu}: DropdownMenuProps) {
  const { topicList, publishTopic } = useContext(RosEventManagerContext);

  const handleLanguageChange = (language: string) => {
    publishTopic('head_ui_settings_lang', language);

    setSettings((prevState: { chatgpt: any; }) => ({
      ...prevState,
      chatgpt: {
        ...prevState.chatgpt,
        language: language,
      }
    }));
    setMenu(false); // 드롭다운 닫기
  }

  return (
    <div className="dropdown-menu">
      {languageOptions.map(option => (
        <div key={option.code} className="dropdown-content" onClick={() => handleLanguageChange(option.code)}>
          {option.label}{lng === option.code && ' ✓'}
        </div>
      ))}
    </div>
  ) 
}

export default function LanguageSettingButton_ChatGPT() {
  const { settings, setSettings } = useContext(AppSettingsContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <div id="button-language-setting-chatgpt">
      <div onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <span>{settings.chatgpt.language}</span>
      </div>
      {isDropdownOpen && (
        <DropdownMenu 
          lng={settings.chatgpt.language} 
          setSettings={setSettings} 
          setMenu={setDropdownOpen} 
        />
      )}
    </div>
  )
}