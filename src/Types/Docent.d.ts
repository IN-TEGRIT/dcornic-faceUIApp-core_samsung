export interface IDocentWayPoint {
  id: number;
  type: string;           // "main" || "sub"
  latin_key?: string;      // 카드 이미지 로딩용 name key hint ex) latin_key: "baekje" -> img-card-1x1m-"baekje".png
  label?: string;
  label_pos?: {
    x: number;
    y: number;
  };
  pos: {
    x: number;
    y: number;
  }
}
