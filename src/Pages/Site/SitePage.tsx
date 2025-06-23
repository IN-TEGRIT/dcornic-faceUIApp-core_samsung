import { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";

// Contexts
import { UserInfoContext } from "../../Contexts";

// Components
import SiteViewer from "./SiteViewer/SiteViewer";

// Styles
import "./SitePage.scss";

export default function SitePage() {
  const location = useLocation();
  const params = useParams();
  let { contentsUrl } = useParams();
  const { building } = useContext(UserInfoContext);

  // useEffect(() => {
  //   console.log('sitePage');
  // }, []);

  // useEffect(() => {
  //   console.log('infoPage:', params);
  // }, [params]);

  // useEffect(() => {
  //   console.log('infoPage location:', location);
  // }, [location]);

  return (
    <div id="site-page" className="page">
      <SiteViewer contentsUrl={contentsUrl} />
      {/* {contentsId === "intro_dconic" &&
        <ContentsDconicInfo />
      }
      {contentsId === "museum" &&
        <ContentsMuseumInfo />
      }
      {contentsId === "timetable" &&
        <ContentsTimetable />
      }
      {contentsId === "event_hwarang" &&
        <ContentsEventHwarang />
      } */}

    </div>
  )
}