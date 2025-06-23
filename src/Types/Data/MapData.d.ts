// "id": 5,
// "type": "main",
// "latin_key": "cheongdonggi",
// "label": "청동기",
// "pos": {
//   "x": 1385,
//   "y": 1009
// },
// "cmd": "CD_MOVE_bronze_age"

interface IMapData {
  id: number;
  type: string;
  latin_key: string;
  label: string
  pos: {
    x: number;
    y: number;
  },
  cmd: string;
}

export type TMapData = IMapData[];