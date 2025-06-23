// 출처 : https://codepen.io/StephenScaff/pen/Jjdveyw

import React, { useEffect } from 'react';

export function useEventListener(eventName, handler, element = document) {
  const savedHandler = React.useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event) => savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}