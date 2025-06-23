/* eslint-disable import/prefer-default-export */
/* eslint-disable react/display-name */
import React, { ComponentProps, FC, ReactNode } from 'react';

import { IFcProps } from '../Types/Common';

export const combineComponents = (...components: FC<IFcProps>[]): FC<IFcProps> => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC<IFcProps>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};
