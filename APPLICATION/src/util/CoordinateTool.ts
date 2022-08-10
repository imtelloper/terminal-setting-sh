export default class CoordinateTool {
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
