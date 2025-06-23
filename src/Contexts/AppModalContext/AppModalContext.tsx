import React, { useEffect, useState } from "react";

import * as UISounds from '../../Resources/Common/Sounds';

// Types
import { EModalPosition, EModalType } from "../../Types/Modal.d";

export interface IModalInfo {
  modalType: EModalType;
  modalPosition?: EModalPosition;
  title?: string;
  contents?: string;
  onCancel?: () => void;
  onOk?: () => void;
}

interface IAlertDialogParams {
  title: string;
  contents: string;
}

interface IConfirmDialogParams {
  title?: string;
  contents: string;
  onOk?: () => void;
  onCancel?: () => void;
  position?: EModalPosition;
  type?: number;
}

interface IQRDialogParams {
  contents: string;
}


interface IAppModalContext {
  modalInfo: IModalInfo;
  closeDialog: () => void;
  alertDialog: ({
    title,
    contents,
  }: IAlertDialogParams) => void;
  confirmDialog: ({
    title,
    contents,
    onOk,
    onCancel,
    position,
    type,
  }: IConfirmDialogParams) => void;
}

const AppModalContext = React.createContext<IAppModalContext>({
  modalInfo: {
    modalType: EModalType.NONE,
    modalPosition: EModalPosition.CENTER,
    title: "",
    contents: "",
    onCancel: () => {},
    onOk: () => {},
  },
  closeDialog: () => {},
  confirmDialog: () => {},
  alertDialog: () => {},
});

export function AppModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [audio, setAudio] = useState(new Audio());
  const [modalInfo, setModalInfo] = useState<IModalInfo>({
    modalType: EModalType.NONE,
    modalPosition: EModalPosition.CENTER,
    title: "",
    contents: "",
    onCancel: () => {},
    onOk: () => {},
  });

  const closeDialog = () => {
    // console.log("closeDialog");
    setModalInfo({
      modalType: EModalType.NONE,
    })
  };

  const alertDialog = ({
    title,
    contents,
  }: IAlertDialogParams) => {
    setModalInfo({
      modalType: EModalType.ALERT,
      title,
      contents,
    })
  };

  const confirmDialog = ({
    title,
    contents,
    onOk,
    onCancel,
    position,
    type,
  }: IConfirmDialogParams) => {
    audio.src = UISounds.openModal;
    setModalInfo({
      modalType: type === 2 ? EModalType.CONFIRM_2 : EModalType.CONFIRM,
      title,
      contents,
      onOk,
      onCancel,
      modalPosition: position,
    });
  };

  useEffect(() => {
    audio.volume = 0.2;
    audio.autoplay = true;
  }, [])

  // useEffect(() => {
  //   console.log("ChangeModalINfo", modalInfo);
  // }, [modalInfo])

  return (
    <AppModalContext.Provider
      value={{
        modalInfo,
        closeDialog,
        alertDialog,
        confirmDialog,
      }}
    >
      {children}
    </AppModalContext.Provider>
  );
}

export default AppModalContext;
