// import FACE_TEST_220811_1124 from './test/dcornic_face_220811_1124.mp4';
// import VIDEO_FACE_TEST from './test/dcornic_face_220829_001.mp4';
/* import VIDEO_FACE_TEST from './FACE_230502.mp4'; */
import VIDEO_FACE_TEST from './FACE_240721.mp4';

import VIDEO_FACE_IDLE from './FACE_IDLE.mp4'
import VIDEO_FACE_IDLE2 from './FACE_IDLE2.mp4'
import VIDEO_FACE_JOY from './FACE_JOY.mp4'
import VIDEO_FACE_ENERGETIC from './FACE_ENERGETIC.mp4'
import VIDEO_FACE_SURPRISE from './FACE_SURPRISE.mp4'
import VIDEO_FACE_SAD from './FACE_SAD.mp4'
import VIDEO_FACE_SLEEPING from './FACE_SLEEPING.mp4'
import VIDEO_FACE_FOCUS from './FACE_FOCUS.mp4'
import VIDEO_FACE_ANXIETY from './FACE_ANXIETY.mp4'
import VIDEO_FACE_SLYNESS from './FACE_SLYNESS.mp4'
import VIDEO_FACE_FURY from './FACE_FURY.mp4'

// import VIDEO_FACE_FAILED_1 from './FAILED_1.mp4';
// import VIDEO_FACE_FAILED_2 from './FAILED_2.mp4';

// import VIDEO_FACE_IDLE_1_1 from './test/IDLE_1.mp4';
// import VIDEO_FACE_IDLE_1_2 from './test/IDLE_2.mp4';
// import VIDEO_FACE_IDLE_1_3 from './test/IDLE_3.mp4';
// import VIDEO_FACE_IDLE_1_4 from './test/IDLE_4.mp4';

import VIDEO_FACE_IDLE_2_1 from './IDLE_2_1.mp4';
import VIDEO_FACE_IDLE_2_2 from './IDLE_2_2.mp4';
import VIDEO_FACE_IDLE_2_3 from './IDLE_2_3.mp4';
import VIDEO_FACE_IDLE_2_4 from './IDLE_2_4.mp4';

import VIDEO_FACE_IDLE_3_1 from './IDLE_3_1.mp4';

import VIDEO_FACE_SPEAKING from './SPEAKING.mp4';
import listening from './listening.mp4'
import thinking from './thinking.mp4'

// import VIDEO_WAKEUP_1 from './WAKEUP_1.mp4'
// import VIDEO_READY_1 from './READY_1.mp4';
// import VIDEO_LISTENING_1 from './LISTENING_1.mp4';

// import VIDEO_FACE_OKAY_1 from './OKAY_1.mp4';
// import VIDEO_FACE_OKAY_2 from './OKAY_2.mp4';
// import VIDEO_FACE_OKAY_3 from './OKAY_3.mp4';

// import VIDEO_FACE_WELCOME from './WELCOME_1.mp4';

import VIDEO_INTRO from './INTRO_1.mp4'

const FACE_TEST = [
  VIDEO_FACE_TEST
]

const FACE_INTRO = [
  VIDEO_INTRO
]

const FACE_EMOTION = [
  VIDEO_FACE_IDLE,
  //VIDEO_FACE_IDLE2,
  VIDEO_FACE_JOY,
  VIDEO_FACE_ENERGETIC,
  VIDEO_FACE_SURPRISE,
  VIDEO_FACE_SAD,
  VIDEO_FACE_SLEEPING,
  VIDEO_FACE_FOCUS,
  VIDEO_FACE_ANXIETY,
  VIDEO_FACE_SLYNESS,
  VIDEO_FACE_FURY
]

// const FACE_FAILED = [
//   VIDEO_FACE_FAILED_1,
//   VIDEO_FACE_FAILED_2,
// ];

// const FACE_IDLE = [
//   VIDEO_FACE_IDLE_1_1,
//   VIDEO_FACE_IDLE_1_2,
//   VIDEO_FACE_IDLE_1_3,
//   VIDEO_FACE_IDLE_1_4,
// ];

const FACE_IDLE_2 = [
  VIDEO_FACE_IDLE_2_1,
  VIDEO_FACE_IDLE_2_2,
  VIDEO_FACE_IDLE_2_3,
  VIDEO_FACE_IDLE_2_4,
]

const FACE_IDLE_3 = [
  VIDEO_FACE_IDLE_3_1
]

// const FACE_WAKEUP = [
//   VIDEO_WAKEUP_1,
// ];

// const FACE_READY = [
//   VIDEO_READY_1,
// ]

// const FACE_LISTENING = [
//   VIDEO_LISTENING_1,
// ]

// const FACE_OKAY = [
//   VIDEO_FACE_OKAY_1,
//   VIDEO_FACE_OKAY_2,
//   VIDEO_FACE_OKAY_3,
// ]

// const FACE_WELCOME = [
//   VIDEO_FACE_WELCOME,
// ]

const FACE_SPEAKING = [
  VIDEO_FACE_SPEAKING,
]

export default {
  test: FACE_TEST,
  intro: FACE_INTRO,
  emotion: FACE_EMOTION,
  listening: [
    listening
  ],
  speaking: [
    // speaking1,
    // speaking2,
    // speaking3,
    // speaking7,
    // speaking8,
    FACE_SPEAKING
    //speakingQR
  ],
  thinking: [
    thinking
  ],
  // failed: FACE_FAILED,
  // idle: FACE_IDLE,
  idle2: FACE_IDLE_2,
  idle3: FACE_IDLE_3,
  // wakeup: FACE_WAKEUP,
  // ready: FACE_READY,
  // listening: FACE_LISTENING,
  // okay: FACE_OKAY,
  // welcome: FACE_WELCOME,
  speaking: FACE_SPEAKING,
};