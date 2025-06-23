export enum EAppEffectType {
  NONE = 0,
  FADE_OUT_EXISTS = 1,
}

export interface IAppEffectLayer {
  effectType: EAppEffectType;
  showEffect: (effectType: EAppEffectType) => void;
}