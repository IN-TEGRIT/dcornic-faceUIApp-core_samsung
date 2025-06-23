import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import LocalConfig from '../../Data/INTE-DCO-04134-012307-00000/config.json';
// import LocalData from '../../Data/INTE-DCO-04134-012307-00000/230726_i815/230726_i815';
// import LocalConfig from '../../Data/INTE-PLA-04134-012305-00000/config.json';
import LocalData from '../../Data/PLATY_SAMSUNG-RESEARCH_250217/250217_samsung/250217_samsung';
import { IVariableObject } from "../../Types/Common.d";

interface IAppDataContext {
  config: IVariableObject,
  loadConfig: () => void;
  menuData: IVariableObject,
  mapData: [],
  setMapData: (mapData: any) => void,
}

const AppDataContext = React.createContext<IAppDataContext>({
  config: {},
  loadConfig: () => {},
  menuData: {},
  mapData: [],
  setMapData: (mapData: any) => {},
});

export function AppDataContextProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<IVariableObject>({});
  const [menuData, setMenuData] = useState<IVariableObject>({});
  const [mapData, setMapData] = useState<any>([]);

  const loadConfig = useCallback(() => {
    console.log('baseURL', process.env.REACT_APP_MAIN_MENU_BASE_URL);
    const URL = `${process.env.REACT_APP_MAIN_MENU_BASE_URL}/${process.env.REACT_APP_ROBOT_FCODE}/config.json`;
    axios
      .get(URL)
      .then((res) => {
        // console.log(res);
        const { status } = res;
        if (status === 200) {
          const { data } = res;
          const { main_menu_version } = data;
          // console.log("load config:", data);
          setConfig(() => ({
            ...data,
            baseUrl: `${process.env.REACT_APP_MAIN_MENU_BASE_URL}/${process.env.REACT_APP_ROBOT_FCODE}/${main_menu_version}`,
          }));
        }
      })
      .catch((err) => {
        console.log("get config error", err);
        setConfig(() => LocalConfig);
      });
  }, [config]);

  useEffect(() => {
    const { baseUrl, main_menu_version, remote } = config;
    // console.log(config);
    if (!remote) {
      setMenuData(() => LocalData);
      return;
    }
    if (!main_menu_version || main_menu_version === '') return;

    const URL = `${baseUrl}/${main_menu_version}.json`
    axios
      .get(URL)
      .then((res) => {
        // console.log(res);
        const { status } = res;
        if (status === 200) {
          const { data } = res;

          // console.log('menu', data);
          setMenuData(() => data);
        }
      })
      .catch((err) => {
        console.log("get menu data error", err);
        setMenuData(() => LocalData);
      });
  }, [config]);

  return (
    <AppDataContext.Provider value={{
      config,
      loadConfig,
      menuData,
      mapData,
      setMapData
    }}>
      {children}
    </AppDataContext.Provider>
  )
}

export default AppDataContext;