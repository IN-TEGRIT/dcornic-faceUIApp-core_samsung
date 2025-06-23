/* eslint-disable @typescript-eslint/no-use-before-define */
export default (function RequestFrameInterval() {
  let procedureID: number;

  let intervalQueuePointer = 0;
  let intervalQueue: any[] = [];

  const start = () => {
    procedureID = window.requestAnimationFrame(intervalLoopWithRequestFrame);
  };

  const stop = () => {
    window.cancelAnimationFrame(procedureID);
  };

  const addInterval = (
    func: (timestamp: number) => void,
    group: string,
    interval: number,
    delay?: number
  ) => {
    const funcName: string = func.name.trim();

    if (delay) {
      intervalQueue.push({
        id: intervalQueuePointer,
        name: funcName,
        group,
        func,
        nextRunTime: performance.now() + delay,
        interval,
      });
    } else {
      intervalQueue.push({
        id: intervalQueuePointer,
        name: funcName,
        group,
        func,
        nextRunTime: performance.now(),
        interval,
      });
    }

    intervalQueuePointer += 1;
  };

  function removeAll() {
    intervalQueue = intervalQueue.filter((item) => item.group === 'app');
  }

  function removeAllGroup(groupName: any) {
    intervalQueue = intervalQueue.filter((item) => item.group !== groupName);
  }

  const intervalLoopWithRequestFrame = (timestamp: number) => {
    // console.log('intervalLoopWithRequestFrame', timestamp);

    intervalQueue.forEach(({ name, func, nextRunTime, interval }, index) => {
      if (timestamp > nextRunTime) {
        // console.log(intervalRequestFrameID);
        // console.log('run interval method', name);
        func(timestamp);
        intervalQueue[index].nextRunTime = timestamp + interval;
      }
    });

    procedureID = window.requestAnimationFrame(intervalLoopWithRequestFrame);
  };

  return {
    start,
    stop,
    addInterval,
    removeAll,
    removeAllGroup,
  };
})();
