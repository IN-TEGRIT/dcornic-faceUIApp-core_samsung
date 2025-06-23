import ROSLIB from "roslib";

export const createTopicObject = (
  rosInst: ROSLIB.Ros,
  topicType: { name: string; messageType: string }
) => {
  const ret = new ROSLIB.Topic({
    ros: rosInst,
    ...topicType,
  });

  return ret;
};
