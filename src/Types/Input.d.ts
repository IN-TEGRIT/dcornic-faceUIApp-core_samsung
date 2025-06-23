export enum ETouchAction {
  IDLE = 0,
  TOUCH_START = 1,
  TOUCH_MOVE = 2,
  TOUCH_END = 3,
}
export enum ETouchState {
  WAIT = 10,
  TOUCH_ONE_TAP = 13,
  TOUCH_DOUBLE_TAP = 14,
  TOUCH_TRIPLE_TAP = 15,
  TOUCH_QUINTUPLE_TAP = 17
}