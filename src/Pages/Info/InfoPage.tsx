import { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";

// Contexts
import { UserInfoContext } from "../../Contexts";

// Components
import ContentsViewer from "./ContentsViewer/ContentsViewer";
import ContentsDconicInfo from "./DConicInfo_220727/Contents_DConicInfo";

// Styles
import "./InfoPage.scss";

const CONTENTS_BASE_URL = "https://dcornic-faceapp-public.s3.ap-northeast-2.amazonaws.com/info";

export default function InfoPage() {
  const location = useLocation();
  const params = useParams();
  let { contentsUrl } = useParams();
  // const { pathname } = location;
  const { building } = useContext(UserInfoContext);

  // useEffect(() => {
  //   console.log('infoPage:', params);
  // }, [params]);

  // useEffect(() => {
  //   console.log('infoPage location:', location);
  // }, [location]);

  // useEffect(() => {
  //   console.log('info contentsUrl', contentsUrl);
  // }, [contentsUrl]);

  return (
    <div id="info-page" className="page">
      {contentsUrl === "intro_dcornic" &&
        <ContentsDconicInfo />
      }
      <ContentsViewer contentsUrl={`${CONTENTS_BASE_URL}/${contentsUrl}/${contentsUrl}.png`} />
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