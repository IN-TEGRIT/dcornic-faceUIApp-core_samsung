/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import ROSLIB from "roslib";

// Contexts
import {
  AppDataContext,
  AppModalContext,
  RosEventManagerContext,
} from "../../Contexts";

// Components
import GridMenuItemComp from "../../Components/Common/GridMenuItem/GridMenuItemComp";
import WeatherWidgetComp from "../../Components/Common/WeatherWidget/WeatherWidget";
import LanguageSettingButton_ChatGPT from "../../Components/Common/LanguageSettingButton_ChatGPT/LanguageSettingButton_ChatGPT";

// Resources
// Menu Contents
import {
  imgM1,
  imgM2,
  imgM3,
} from "../../Resources/DetailsPage";

// Styles
import "./MainMenuContainer.scss";

export default function MainMenuContainer({ pos }: { pos: string }) {
  const { alertDialog } = useContext(AppModalContext);
  const { topicList } = useContext(RosEventManagerContext);
  const { config, menuData, mapData } = useContext(AppDataContext);

  const renderMainMenu = () => {
    console.log('renderMainMenu:', menuData);
    const { main_menu } = menuData;

    const ret: any[] = [];
    if (!main_menu) return <></>
    if (Object.keys(main_menu).length === 0) return <></>;
    Object.keys(main_menu).forEach((key, index) => {
      const { gridArea, imgSrc, path, WidgetComponent, disabled, service } =
        main_menu[key];
      // console.log(menuData[key])
      if (WidgetComponent) {
        if (WidgetComponent === "LanguageSettingButton_ChatGPT") {
          ret.push(<LanguageSettingButton_ChatGPT />);
        } else if (WidgetComponent === "WeatherWidgetComp") {
          ret.push(<WeatherWidgetComp />);
        }
      } else {
        const { baseUrl } = config;
        console.log(key);
        const imgUrl = `${baseUrl}/main_menu/${key}.png`;
        ret.push(
          <GridMenuItemComp
            key={`main-menu-item-${index}`}
            gridArea={gridArea}
            imgSrc={imgSrc || imgUrl}
            path={path}
            index={index}
            disabled={disabled}
            service={service}
          />
        );
      }
    });

    return ret;
  };

  return (
    <div className="main-menu-grid-container">
      {renderMainMenu()}
      {/* {ITEM_DATA.map(
        ({ gridArea, imgSrc, path, WidgetComponent, disabled }, index) => {
          if (imgSrc) {
            return (
              <GridMenuItemComp
                key={`main-menu-item-${index}`}
                gridArea={gridArea}
                imgSrc={imgSrc}
                path={path}
                index={index}
                disabled={disabled}
              />
            );
          } else if (WidgetComponent) {
            return <WidgetComponent />;
          }
        }
      )} */}
    </div>
  );
}
