import React, { useState, useContext, useEffect } from "react";

// Components
import SegmentedControlComp from "../../../../Components/Common/SegmentedControlComp/SegmentedControlComp";

// Resources

// Data

// Styles
import "./DrivingContents.scss";
import AppDataContext from "../../../../Contexts/AppDataContext/AppDataContext";
import AppModalContext from "../../../../Contexts/AppModalContext/AppModalContext";

// Constraints
const FILTER_ITEMS =[{
  label: "A구역",
  filter: "A",
},
{
  label: "B구역",
  filter: "B",
}]

export default function DrivingContents() {
  const { confirmDialog } = useContext(AppModalContext);
  const { menuData } = useContext(AppDataContext);
  const { maps } = menuData;
  const [selectedItem, setSelectedItem] = useState(0);

  const handleChangeItem = (index: number) => {
    setSelectedItem(() => index);
  }

  const handleClickPoint = (e: any) => {
    const { point } = e.currentTarget.dataset;
    confirmDialog({
      type: 2,
      contents: `포인트-${point}로 이동하시겠습니까?`,
      onOk: () => {
        console.log("move point", point);
      },
    });
  }

  const renderMap = () => {
    const map = maps[selectedItem];

    return <img src={map.map_image} />
  }

  const renderPoints = () => {
    const map = maps[selectedItem];

    const renderPoints = Object.keys(map.points).map((key) => {
      const name = key;
      const point = map.points[key]

      return <div className="point" style={{ top: point.y, left: point.x }} data-point={name} onClick={handleClickPoint}>
        <div className="label">{name}</div>
      </div>
    })

    return renderPoints;
  }

  return (
    <div id="details-driving-contents" className="contents">
      <SegmentedControlComp items={FILTER_ITEMS} selectedItem={selectedItem} onChange={handleChangeItem} />
      <div className="map-container">
        {renderMap()}
        {renderPoints()}
      </div>
    </div>
  )
}