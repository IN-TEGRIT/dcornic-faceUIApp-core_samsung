import * as MainMenu from '../../../Resources/MainPage';

import * as DetailsMenu from '../../../Resources/DetailsPage';

import imgMap1 from '../../../Resources/DetailsPage/maps/map_1.png';
import imgMap2 from '../../../Resources/DetailsPage/maps/map_2.png';

const data = {
  "main_menu": {
    "m1": {
      "gridArea": "m1",
      "service": {
        "cmd": "samsung_mode_change",
        "type": "change-mode",
        "param": 0,
      },
      "imgSrc": MainMenu.imgM1_kr,
    },
    "m2": {
      "gridArea": "m2",
      "service": {
        "cmd": "samsung_mode_change",
        "type": "change-mode",
        "param": 1,
      },
      "imgSrc": MainMenu.imgM2_kr,
    },
    "m3": {
      "gridArea": "m3",
      "service": {
        "cmd": "samsung_mode_change",
        "type": "change-mode",
        "param": 2,
        "confirmText": "귀빈 안내를 시작할까요?",
      },
      "imgSrc": MainMenu.imgM3_kr,
    },
    "m4": {
      "gridArea": "m4",
      "service": {
        "cmd": "start_auto_parking",
        "confirmText": "비상 복귀를 시작할까요?",
      },
      "imgSrc": MainMenu.imgM4_kr,
    },
    "m5": {
      "gridArea": "m5",
      "disabled": true,
      "service": {
        "cmd": "i815_request_return",
        "confirmText": "악천후 대응모드로 전환할까요?",
      },
      "imgSrc": MainMenu.imgM5_kr,
    },
    // "m6": {
    //   "name": "이동",
    //   "gridArea": "m6",
    //   "path": "/details",
    //   "imgSrc": MainMenu.imgM6,
    // },
    "m7": {
      "name": "설정하기",
      "gridArea": "m7",
      "path": "/settings",
      "imgSrc": MainMenu.imgM7,
    }
  },
  "details_menu": {
    "m1": {
      "gridArea": "m1",
      "path": "/details/services",
      "imgSrc": DetailsMenu.imgM1,
    },
    "m2": {
      "gridArea": "m2",
      "path": "/details/narration",
      "imgSrc": DetailsMenu.imgM2,
    },
    "m3": {
      "gridArea": "m3",
      "path": "/details/driving",
      "imgSrc": DetailsMenu.imgM3,
    },
    "m4": {
      "gridArea": "m4",
      "path": "/details/control",
      "imgSrc": DetailsMenu.imgM4,
    }
  },
  "services": {
    /* "1_1-2": {
      "area": "Info",
      "location": "1",
      "text": "자! 여러분 이제 체험을 시작할 시간이에요. 모두 제가 서 있는 이 곳으로 모여주세요!"
    }, */
    "1_1-1": {
      "area": "Info",
      "location": "1",
      "text": "안녕하세요 여러분 저는 '삼성전자 스마트오피스 실증을 위한 AI미디어로봇 '플래티Z'입니다. \n 스마트오피스에 오신 것을 환영합니다! \n만나서 반갑습니다.\n"
    },
    "1_1-2": {
      "area": "Info",
      "location": "1",
      "text": "이곳은 삼성전자의 혁신과 열정이 살아 숨 쉬는 곳으로, \n 스마트 오피스의 핵심 역할을 하는 공간이에요."
    },
    "1_1-3": {
      "area": "Info",
      "location": "1",
      "text": "스마트오피스에 관하여 궁금한 점이 있으면 가까이 오셔서 '헤이 플래티'하고 이름을 부르거나 질문을 해주시면 됩니다.\n그리고 기념사진을 찍고 싶으시면 제 얼굴 정면 카메라가 보이는 위치에서 3초간 주먹을 쥐고 있으시면 사진촬영 모드가 준비됩니다. 이후 손바닥을 펴 주시면 기념 사진촬영을 하실 수 있습니다."
    },
    "2_2-1": {
      "area": "Info",
      "location": "2",
      "text": "여기는 회의실 구역입니다! 스마트한 회의와 멋진 아이디어들이 끊임없이 탄생하는 곳이죠."
    },
    "3_3-1": {
      "area": "Info",
      "location": "3",
      "text": "C동 2층은 특별한 공간으로, 보안이 강화되어 있는 구역이기 때문에 출입 시 꼭 출입증을 소지해 주셔야 합니다. "
    },
    "3_3-2": {
      "area": "Info",
      "location": "3",
      "text": " 출입 게이트에서는 여러분의 출입증 태그와 얼굴 인식 시스템을 통해 빠르고 안전하게 입장이 가능해요."
    },
    "4_4-1": {
      "area": "Info",
      "location": "4",
      "text": "혹시 출입에 문제가 발생하거나 도움이 필요하시다면, 가까운 안내데스크에 문의해 주시면 친절히 도와드릴 거예요. "
    },
    "4_4-2": {
      "area": "Info",
      "location": "4",
      "text": "그리고 잊지 마세요, 이 공간에서는 보안 규정을 철저히 지켜야 한다는 것!"
    },
    "5_5-1": {
      "area": "Info",
      "location": "5",
      "text": "안녕하세요 여러분 저는 '삼성전자 스마트오피스 실증을 위한 AI미디어로봇 '플래티Z'입니다. \n 스마트오피스에 오신 것을 환영합니다! \n만나서 반갑습니다.\n",
    },
    "6_6-1": {
      "area": "Lobby",
      "location": "6",
      "text": "이곳은 C동에 처음 들어오시는 분들을 맞이하는 환영의 공간이에요."
    },
    "7_7-1": {
      "area": "Lobby",
      "location": "3",
      "text": "C동 2층은 특별한 공간으로, 보안이 강화되어 있는 구역이기 때문에 출입 시 꼭 출입증을 소지해 주셔야 합니다. "
    },
    "7_7-2": {
      "area": "Lobby",
      "location": "3",
      "text": " 출입 게이트에서는 여러분의 출입증 태그와 얼굴 인식 시스템을 통해 빠르고 안전하게 입장이 가능해요."
    },
    "7_7-3": {
      "area": "Lobby",
      "location": "4",
      "text": "혹시 출입에 문제가 발생하거나 도움이 필요하시다면, 가까운 안내데스크에 문의해 주시면 친절히 도와드릴 거예요. "
    },
    // "A_A-1": {
    //   "area": "Info",
    //   "location": "A",
    //   "text": "여러분 앞에 보이는 건물모형은 1919년 3월 1일 독립선언식을 거행했던 탑골공원의 팔각정을 본따서 만든 것입니다.\n이곳에서 우리민족이 일제의 식민지 지배를 부정하고 우리나라가 독립국임을 선언하는 내용이 담긴 독립선언서를 낭독하였습니다.  그리고 많은 사람들은 거리로 나와 '대한독립만세'를 외쳤습니다. 저와 함께 '대한독립만세'를 외치고, 앞쪽의 큰 화면을 통해 3.1운동 현장의 분위기를 느껴볼까요?"
    // },
    // "A_A-2": {
    //   "area": "Info",
    //   "location": "A",
    //   "text": "그럼 지금부터 독립선언식을 시작하겠습니다.\n우리나라는 독립한 나라이며 우리민족은 자주적인 민족임을 선언한다.\n다 함께 ‘대한독립만세”를 외칩시다.\n하나 둘 셋 “대한독립 만세 대한 독립 만세“"
    // },
    "B_B-1": {
      "area": "Lobby",
      "location": "B",
      "text":  "이곳은 C동에 처음 들어오시는 분들을 맞이하는 환영의 공간이에요."
    },
    // "B_B-2": {
    //   "area": "Lobby",
    //   "location": "B",
    //   "text": "죄송합니다~ 저는 체험관 안내를 위해 이동하는 중이라 지금은 대답을 할 수 가 없어요~ 다음에 다시 만나요"
    // },
    "B_B-1": {
      "area": "Lobby",
      "location": "B",
      "text": "제가 앞으로 갈 수 있게 길을 비켜주시겠어요? 감사합니다."
    },
    "B_B-2": {
      "area": "Lobby",
      "location": "7",
      "text": "혹시 걸으면서 스마트폰 화면을 보느라 앞을 제대로 못 본 경험이 있으신가요? \n 이런 작은 습관이 예상치 못한 사고로 이어질 수 있다는 사실, 알고 계셨나요? "
    },
    "B_B-3": {
      "area": "Lobby",
      "location": "8",
      "text": "걸을 때 스마트폰은 주머니에 넣어두기! \n 중요한 메시지나 전화가 오면 안전한 곳에 멈춰서 확인하기! "
    },
    "B_B-3": {
      "area": "Lobby",
      "location": "8",
      "text": "다른 사람들에게도 이 습관을 공유하며 함께 실천하기!"
    },
    // "B_B-4": {
    //   "area": "Lobby",
    //   "location": "B",
    //   "text": "체험관에서 저를 부르고 있어요. 길을 비켜주시겠어요? 감사합니다."
    // },
    // "B_B-5": {
    //   "area": "Lobby",
    //   "location": "B",
    //   "text": "안녕하세요 독립기념관입니다.\n독립기념관의 주인은 국민 여러분 입니다.\n저희 독립기념관 임직원은 국민 여러분들이 찾아오시는 것을 무척이나 기쁘게 생각하고 있습니다. 여러분들의 방문을 적극적으로 환영하며, 독립기념관에서 여러분들을 최상의 서비스로 맞이할 준비를 갖추고 있습니다. 여러분들의 관심과 사랑으로 가득한 독립기념관에서 국민 여러분들과 함께 특별한 시간을 보낼 수 있기를 진심으로 바랍니다. 언제든지 여러분들의 방문을 기다리고 있습니다!"
    // }
  },
  "driving": {
    
  },
  "maps": [
    {
      "name": "A 구역",
      "area": "A",
      "map_image": imgMap1,
      "locations": [

      ],
      "points": {
        "1": {
          "x": 409,
          "y": 295,
        },
        "2": {
          "x": 413,
          "y": 341,
        },
        "3": {
          "x": 358,
          "y": 258,
        },
        "4": {
          "x": 397,
          "y": 258,
        },
      },
    },
    {
      "name": "B 구역",
      "area": "B",
      "map_image": imgMap2,
      "locations": [
        
      ],
      "points": {
        "5": {
          "x": 347,
          "y": 341,
        },
        "6": {
          "x": 188,
          "y": 359,
        },
        "7": {
          "x": 199,
          "y": 247,
        },
        "8": {
          "x": 396,
          "y": 217,
        },
      },
    }
  ]
}

export default data;