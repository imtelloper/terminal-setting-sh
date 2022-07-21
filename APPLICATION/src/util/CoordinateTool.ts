export default class CoordinateTool {
  static coordinateMaker = (coordNums: []) => {
    const totalCoords = [];
    let coordinate: Array<number> = [];
    coordNums?.forEach((num) => {
      coordinate.push(parseInt(num, 10));
      // coordinate.push(num);
      if (coordinate.length === 2) {
        totalCoords.push(coordinate);
        coordinate = [];
      }
    });
    return totalCoords;
  };
}
