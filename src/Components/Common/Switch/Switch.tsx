/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// import styled from 'styled-components';
import './Switch.scss';

interface ISwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Switch({ value, onChange }: ISwitchProps) {
  // const testButton = styled.testbutton`
  //   font-size: 1.5em;
  //   text-align: center;
  //   color: palevioletred;
  // `;

  const handleChange = () => {
    onChange(!value);
  };

  return (
    <label className="switch">
      <input type="checkbox" onChange={handleChange} checked={value} />
      <span className="slider round" />
    </label>
  );
}
