export default class CoordinateTool {
  /* 일렬로 나열된 좌표 배열을 2차원 좌표 배열로 변환해줌 */
  static coordinateMaker = (coordNums: Array<any>) => {
    const totalCoords = [];
    let coordinate: Array<number> = [];
    coordNums?.forEach((num) => {
      coordinate.push(parseInt(num, 10));
      if (coordinate.length === 2) {
        totalCoords.push(coordinate);
        coordinate = [];
      }
    });
    return totalCoords;
  };
}
