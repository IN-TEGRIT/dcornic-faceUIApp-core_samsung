/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, useEffect } from "react";
import ROSLIB from "roslib";

// Contexts
import { AppDataContext, AppModalContext, RosEventManagerContext } from "../../../../Contexts";

// Components
import SegmentedControlComp from "../../../../Components/Common/SegmentedControlComp/SegmentedControlComp";

// Resources
import icPlay from '../../../../Resources/Common/Icons/ic-play.png';

// Styles
import "./ServiceContents.scss";

const FILTER_ITEMS = [
  {
    label: "전체",
    filter: "all",
  },
  {
    label: "A구역",
    filter: "A",
  },
  {
    label: "B구역",
    filter: "B",
  }
]

export default function ServiceContents() {
  const { confirmDialog } = useContext(AppModalContext);
  const { menuData } = useContext(AppDataContext);
  const { robotLocationID, topicList } = useContext(
    RosEventManagerContext
  );
  
  const { services } = menuData;

  const [serviceList, setServiceList] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState(0);

  const getFilteredList = (filter: string) => {
    if (filter === 'all') {
      return serviceList;
    } else {
      return serviceList.filter((k: { area: string }) => k.area === filter);
    }
  }

  const handleChangeItem = (index: number) => {
    setSelectedItem(() => index);
  }

  const handleClickPlay = (e: any) => {
    const { target } = e.currentTarget.dataset;
    confirmDialog({
      type: 2,
      contents: `${target} 운영을 시작하시겠습니까?`,
      onOk: () => {
        console.log("play service", target);
      },
    });
  }

  const getListItemComps = (list: { key: string, text: string }[]) => {
    console.log('getListItemComps:', list);
    return list.map((item: { key: string, text: string }) => {
      const parsedKey = item.key.split('_');

      return (
        <div className="list-item">
          <div className="key">{parsedKey[1]}</div>
          <div className="text">{item.text}</div>
          {/* <div className="button-container"><button type="button"><img src={icPlay} /></button></div> */}
        </div>
      )
    })
  }

  const renderList = () => {
    // const list = getFilteredList(FILTER_ITEMS[selectedItem].filter);
    if (FILTER_ITEMS[selectedItem].filter === 'all') {
      const A_List = getFilteredList("A");
      const B_List = getFilteredList("B");
      return <>
        <div className="cat-title">
          <div className="title">전체 구역</div>
          <div className="play-area" data-target="전체" onClick={handleClickPlay}>
            <img src={icPlay} /><label>시작</label>
          </div>
        </div>
        <div className="cat-title small">
          <div className="title">A 구역</div>
          <div className="play-area" data-target="A구역" onClick={handleClickPlay}>
            <img src={icPlay} /><label>시작</label>
          </div>
        </div>
        {getListItemComps(A_List)}

        <div className="cat-title small">
          <div className="title">B 구역</div>
          <div className="play-area" data-target="B구역" onClick={handleClickPlay}>
            <img src={icPlay} /><label>시작</label>
          </div>
        </div>
        {getListItemComps(B_List)}
      </>
    } else {
      const list = getFilteredList(FILTER_ITEMS[selectedItem].filter);
      return (
        <>
          <div className="cat-title">
            <div className="title">{FILTER_ITEMS[selectedItem].filter} 구역</div>
            <div className="play-area"><img src={icPlay} /><label>시작</label></div>
          </div>
          {getListItemComps(list)}
        </>
      );
    }


  }

  useEffect(() => {
    if (services) {
      const list: any[] = [];
      Object.keys(services).map((key) => {
        list.push({
          key,
          ...services[key],
        });
      });

      setServiceList(() => list);
    }
  }, [services]);

  return (
    <>
      <div id="details-service-contents" className="contents">
        <SegmentedControlComp items={FILTER_ITEMS} selectedItem={selectedItem} onChange={handleChangeItem} />
        <div className="list-container">
            {renderList()}
        </div>
      </div>
      <div className="contents-popup">
        <div className="header"></div>
        <div className="body">
          <div className="contents"></div>
        </div>
      </div>
    </>
  )
}