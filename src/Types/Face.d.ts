export enum EFaceState {
  NONE = 100,
  IDLE_1 = 101,
  IDLE_2,

  WELCOME,

  OKAY_1,
  OKAY_2,
  OKAY_3,

  FAILED_1,
  FAILED_2,

}

export enum EVoiceState {
  NONE = 200,
  VOICE_INPUT = 201,
  VOICE_OUTPUT,
}

export enum EVoiceUIState {
  NONE = 300,
  VOICE_UI = 301,
}
