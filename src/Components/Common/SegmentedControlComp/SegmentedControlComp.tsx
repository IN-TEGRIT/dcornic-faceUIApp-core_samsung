import React from "react";

import './SegmentedControlComp.scss';

export default function SegmentedControlComp({
  items,
  selectedItem,
  onChange,
}: {
  items: any[];
  selectedItem: number;
  onChange: (selectItem: number) => void;
}) {
  const selectItem = (index: number) => {
    if (onChange) onChange(index);
  }

  return (
    <div className="segmented-control">
      {items.map((item, index) => {
        return (
          <div
            key={`segmented-control-item-${index.toString()}`}
            className={`segmented-control-item${selectedItem === index ? " selected" : ""}`}
            onClick={() => selectItem(index)}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
