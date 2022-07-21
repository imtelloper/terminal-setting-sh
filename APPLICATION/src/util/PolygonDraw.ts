export default class PolygonDraw {
  getCentroid = (points) => {
    let area = 0;
    let cx = 0;
    let cy = 0;

    for (let i = 0; i < points?.length; i++) {
      const j = (i + 1) % points?.length;

      const pt1 = points[i];
      const pt2 = points[j];

      const x1 = pt1[0];
      const x2 = pt2[0];
      const y1 = pt1[1];
      const y2 = pt2[1];

      area += x1 * y2;
      area -= y1 * x2;

      cx += (x1 + x2) * (x1 * y2 - x2 * y1);
      cy += (y1 + y2) * (x1 * y2 - x2 * y1);
    }

    area /= 2;
    area = Math.abs(area);

    cx /= 6.0 * area;
    cy /= 6.0 * area;

    return {
      x: Math.abs(cx),
      y: Math.abs(cy),
    };
  };

  squaredPolar = (point, centre) => {
    return [
      Math.atan2(point[1] - centre[1], point[0] - centre[0]),
      (point[0] - centre[0]) ** 2 + (point[1] - centre[1]) ** 2, // Square of distance
    ];
  };

  /* 두점 사이의 거리 구하기 */
  static getTwoPointsDistance = (
    coordinate1: Array<number>,
    coordinate2: Array<number>
  ) => {
    const firstPoints = coordinate1;
    const secondPoints = coordinate2;
    const twoPointsDistance = Math.sqrt(
      (secondPoints[0] - firstPoints[0]) ** 2 +
        (secondPoints[1] - firstPoints[1]) ** 2
    );
    return twoPointsDistance;
  };

  static getDistanceRate = (twoPointsDistance, lineDistance) => {
    return twoPointsDistance / lineDistance;
  };

  /* 다각형의 점 찍기 */
  static drawPoints = (context, x, y, pointSize: number, color = '#42f593') => {
    context.beginPath();
    context.arc(x, y, pointSize, 0, 2 * Math.PI, true);
    context.fillStyle = color;
    context.fill();
  };

  /* 다각형 라인 그리기 */
  static drawLines = (
    context,
    targetPoints,
    lineSize: number,
    color = '#42f593'
  ) => {
    context.strokeStyle = color;
    context.lineWidth = lineSize;
    context.beginPath();
    context.moveTo(...targetPoints[0]);
    for (const [x, y] of targetPoints.slice(1)) context.lineTo(x, y);
    context.closePath();
    context.stroke();
  };

  static setPolygonPoints = (pointsArray, x, y, ctx, size, color) => {
    const roundedX = Math.round(x);
    const roundedY = Math.round(y);
    pointsArray.push([roundedX, roundedY]);
    this.drawPoints(ctx, roundedX, roundedY, size, color);
  };
}
